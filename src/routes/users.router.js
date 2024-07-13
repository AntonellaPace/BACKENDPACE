import express from "express";
import passport from "passport";

import UserController from "../controllers/users.controller.js";

const router = express.Router();
const userController = new UserController();

router.post("/", userController.registerUser);
router.post("/login", userController.validateUser);
router.get("/logout", userController.logout);

router.get("/current", passport.authenticate("current", {session: false, failureRedirect: "/login"}), (req, res) => {
    res.send(req.user);
});

router.get("/github", passport.authenticate("github", {
    scope: ["user: email"]
}), async (req, res) => {});

router.get("/githubcallback", passport.authenticate("github", {
    failureRedirect: "/login"
}), userController.githubToken);

export default router;