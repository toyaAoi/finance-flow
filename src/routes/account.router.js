import { Router } from "express";
import { authenticateToken } from "../utils/middleware.utils.js";
import {
  accountCreate,
  fetchAccountDetails,
  fetchAccountDetailsById,
  requestAccess,
  responseAccess,
  removeAccess,
} from "../controllers/account.controller.js";

const router = Router();

router.post("/", authenticateToken, accountCreate);
router.get("/", authenticateToken, fetchAccountDetails);
router.get("/:id", authenticateToken, fetchAccountDetailsById);
router.post("/:id/access-request", authenticateToken, requestAccess);
router.post("/:id/access-response", authenticateToken, responseAccess);
router.delete("/:id/access-remove/:userId", authenticateToken, removeAccess);

export default router;
