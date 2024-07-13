import UserService from "../services/users.services.js";
import configObject from "../config/config.js";

const { cookie, token_pass } = configObject;
const userService = new UserService();

class UserController {
    async registerUser(req, res) {
        try {
            const {first_name, last_name, email, password, age} = req.body;

            const token = await userService.registerUser(first_name, last_name, email, password, age);
    
            res.cookie(cookie, token, {
                maxAge: 3600000,
                httpOnly: true
            });
    
            res.redirect("/products");
        } catch (error) {
            res.status(500).send(`No se pudo registrar el usuario: ${error}`);
        }
    }

    async validateUser(req, res) {
        try {
            const {email, password} = req.body;
            const token = await userService.validateUser(email, password);

            res.cookie(cookie, token, {
                maxAge: 3600000,
                httpOnly: true
            });
        
            res.redirect("/products");
        } catch (error) {
            res.status(500).send(`No se pudo obtener el usuario: ${error}`);
        }
    }

    async githubToken(req, res) {
        try {
            let token;

            await userService.findUser(req.user.email) ? 
                token = await userService.validateUser(req.user.email, req.user.password):
                token = await userService.registerUser(req.user.first_name, req.user.last_name, req.user.email, req.user.password, req.user.age);

            res.cookie(cookie, token, {
                maxAge: 3600000,
                httpOnly: true
            });
        
            res.redirect("/products");
        } catch (error) {
            res.status(500).send(`No se pudo generar el token: ${error}`);
        }
    }

    async logout(req, res) {
        res.clearCookie(cookie);
        res.redirect("/login");
    }
}

export default UserController;