// user.routes.js
import express from "express";
import { login, logout, register } from "../controllers/user.controller.js";
import { secureRoutes } from "../middlewares/protectRoute.middleware.js";
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(secureRoutes, logout);
export default router;
