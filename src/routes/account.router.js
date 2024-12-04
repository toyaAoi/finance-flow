import { Router } from "express";
import { authenticateToken } from "../utils/middleware.utils.js";
import {
  accountCreate,
  addUser,
  fetchAccountDetails,
  fetchAccountDetailsById,
  removeUser,
} from "../controllers/account.controller.js";

const router = Router();

router.post("/", authenticateToken, accountCreate);
router.get("/", authenticateToken, fetchAccountDetails);
router.get("/:id", authenticateToken, fetchAccountDetailsById);
router.post("/:id/user", authenticateToken, addUser);
router.delete("/:id/user/:userId", authenticateToken, removeUser);

export default router;
