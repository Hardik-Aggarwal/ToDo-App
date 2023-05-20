import express from "express";
import {login,register, getMyProfile,logout} from "../controllers/user.js"
import { isAutenticated } from "../middlewares/auth.js";
const router = express.Router();

router.post("/new",register);
router.post("/login",login);
router.get("/logout",logout);
router.get("/me",isAutenticated,getMyProfile);

export default router;
