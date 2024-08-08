import UserService from "../services/users.services.js";
import configObject from "../config/config.js";
import UserModel from "../models/user.model.js";
import EmailManager from "../services/email.services.js"

import { isValidPassword, createHash } from "../utils/hashbcrypt.js";
import { generateResetToken } from "../utils/functions.js";

const emailManager = new EmailManager();
const { cookie, token_pass } = configObject;
const userService = new UserService();

class UserController {
    async registerUser(req, res) {
        try {
            const {first_name, last_name, email, password, age} = req.body;

            const token = await userService.registerUser(first_name, last_name, email, password, age);
    
            res.cookie(cookie, token, {
                maxAge: 300000,
                httpOnly: true
            });
    
            res.redirect("/products");
        } catch (error) {
            req.logger.error(`No se pudo registrar el usuario, ${error}`);
        }
    }

    async validateUser(req, res) {
        try {
            const {email, password} = req.body;
            const token = await userService.validateUser(email, password);

            res.cookie(cookie, token, {
                maxAge: 300000,
                httpOnly: true
            });
        
            res.redirect("/products");
        } catch (error) {
            req.logger.error(`No se pudo obtener el usuario, ${error}`);
        }
    }

    async githubToken(req, res) {
        try {
            let token;

            await userService.findUser(req.user.email) ? 
                token = await userService.validateUser(req.user.email, req.user.password):
                token = await userService.registerUser(req.user.first_name, req.user.last_name, req.user.email, req.user.password, req.user.age);

            res.cookie(cookie, token, {
                maxAge: 300000,
                httpOnly: true
            });
        
            res.redirect("/products");
        } catch (error) {
            req.logger.error(`No se pudo generar el token, ${error}`);
        }
    }

    async logout(req, res) {
        res.clearCookie(cookie);
        res.redirect("/login");
    }

    async requestPasswordReset(req, res) {
        const { email } = req.body;

        try {
            const user = await UserModel.findOne({ email });
            if (!user) {
                return res.status(404).send("El usuario no se encontro");
            }

            const token = generateResetToken();

            user.resetToken = {
                token: token,
                expiresAt: new Date(Date.now() + 300000)
            };
            await user.save();
            await emailManager.enviarCorreoRestablecimiento(email, user.first_name, token);

            res.status(200).send("Correo enviado con exito!, revisa en Spam");
        } catch (error) {
            console.error(error);
            res.status(500).send("Error interno del servidor");
        }
    }

    async resetPassword(req, res) {
        const { email, password, token } = req.body;

        try {
            const user = await UserModel.findOne({ email });
            if (!user) {
                return res.status(404).send("Usuario no encontrado");
            }

            const resetToken = user.resetToken;
            if (!resetToken || resetToken.token !== token) {
                return res.status(400).send("Token invalido");
            }

            const now = new Date();
            if (now > resetToken.expiresAt) {
                return res.status(400).send("Token expirado");
            }

            if (isValidPassword(password, user)) {
                return res.status(400).send("La contraseña ingresada debe ser distinta a la anterior");
            }

            user.password = createHash(password);
            user.resetToken = undefined;
            await user.save();

            return res.redirect("/login");
        } catch (error) {
            console.error(error);
            return res.status(500).render("passwordreset", { error: "Error interno del servidor" });
        }
    }
}

export default UserController;

