import { Router } from "express";
import passport from "passport";

import CartController from "../controllers/carts.controller.js";
import TicketController from "../controllers/ticket.controller.js";

const router = Router();
const cartController = new CartController();
const ticketController = new TicketController();

router.get("/", cartController.getCarts)
router.post("/", passport.authenticate("current", {session: false, failureRedirect: "/login"}), cartController.addCart);
router.get("/:cid", cartController.getCartById);
router.post("/:cid/product/:pid", cartController.addProductToCart);
router.delete("/:cid/product/:pid", cartController.deleteProduct);
router.put("/:cid", cartController.updateCart);
router.put("/:cid/product/:pid", cartController.updateProduct);
router.delete("/:cid", cartController.deleteCart);
router.get("/:cid/purchase", ticketController.generateTicket);

export default router