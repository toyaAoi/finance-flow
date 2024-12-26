import { Router } from "express";
import {
  accountCreate,
  fetchAccountDetailsById,
  requestAccess,
  responseAccess,
  removeAccess,
} from "../controllers/account.controller.js";

const router = Router();

router.post("/", accountCreate);
router.get("/:id", fetchAccountDetailsById);
router.post("/:id/access-request", requestAccess);
router.post("/:id/access-response", responseAccess);
router.delete("/:id/access-remove/:userId", removeAccess);

export default router;
