import mongoose from "mongoose";
import {expect} from "chai";
import UserService from "../src/services/users.services.js";

mongoose.connect("mongodb+srv://antopaceescoto:coderhouse@cluster0.r4w1gui.mongodb.net/backendpacee?retryWrites=true&w=majority&appName=Cluster0");

describe("Test de usuarios", function () {
    
    before(function() {
        this.users = new UserService();
    });

    it("Debe de crearse un usuario", async function() {
        const res = await this.users.registerUser("prueba", "usuario", "prueba@usuario.com", "1234", 26);
        expect(res).to.be.an("string");
    });

    it("Debe encontrar un usuario por su mail", async function() {
        const res = await this.users.findUser("prueba@usuario.com");
        expect(res).to.have.property("_id");
    });

    it("Debe poder validar un usuario con mail y password", async function() {
        const res = await this.users.validateUser("prueba@usuario.com", "1234");
        expect(res).to.be.an("string");
    });
    
    it("Debe poder borrar un usuario por su mail", async function() {
        const res = await this.users.deleteUser("prueba@usuario.com");
        expect(res).to.be.an("object");
    });

    after(async function() {
        await mongoose.disconnect();
    });

});