import { Router } from "express";
import {
  userLogin,
  userRegister,
  tokenLogin,
} from "../controllers/user.controller.js";
import { authenticateToken } from "../utils/middleware.utils.js";

const router = Router();

router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/token-login", authenticateToken, tokenLogin);

export default router;
