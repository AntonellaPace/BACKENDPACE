import UserModel from "../models/user.model.js";
import CartService from "./carts.services.js";
import jwt from "jsonwebtoken";

import { createHash, isValidPassword } from "../utils/hashbcrypt.js";
import configObject from "../config/config.js";

const { token_pass } = configObject;
const cartService = new CartService();

class UserService {
        async registerUser(first_name, last_name, email, password, age) {
            try {
                let user = await UserModel.findOne({email});
        
                if(user) throw new Error("El usuario ya existe");
        
                const cart = await cartService.addCart(email);
        
                let newUser = {
                    first_name,
                    last_name,
                    email,
                    password: createHash(password),
                    age,
                    cart: cart._id
                };
        
                const createdUser = await UserModel.create(newUser); // Create the user and get the created user object
                
                const token = jwt.sign({email}, token_pass, {expiresIn: "1h"});
        
                await UserModel.findByIdAndUpdate(createdUser._id, {last_connection: new Date()});
        
                return token;
            } catch (error) {
                throw new Error(`Registration failed: ${error.message}`);
            }
        }

    async validateUser(email, password) {
        try {
            const user = await UserModel.findOne({email});
    
            if(!user) throw new Error("El usuario no existe");
    
            if(!isValidPassword(password, user)) throw new Error("Usuario y contraseña no coinciden");
    
            const token = jwt.sign({email}, token_pass, {expiresIn: "1h"});

            await UserModel.findByIdAndUpdate(user._id, {last_connection: new Date()});

            return token;
        } catch (error) {
            throw new Error(error);
        }
    }

    async findUser(email) {
        try {
            const user = await UserModel.findOne({email});

            return user;
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteUser(email) {
        try {
            const deletedUser = await UserModel.deleteOne({email});

            return deletedUser;
        } catch (error) {
            throw new Error(error);
        }
    }
}

export default UserService;