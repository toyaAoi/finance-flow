import { Router } from "express";
import {
  accountCreate,
  fetchAccountDetailsById,
  requestAccess,
  responseAccess,
  removeAccess,
} from "../controllers/account.controller.js";
import {
  transactionCategoryCreate,
  transactionCategoryEdit,
} from "../controllers/transactionCategory.controller.js";

const router = Router();

router.post("/", accountCreate);
router.get("/:id", fetchAccountDetailsById);
router.post("/:id/access-request", requestAccess);
router.post("/:id/access-response", responseAccess);
router.delete("/:id/access-remove/:userId", removeAccess);

router.post("/:id/transaction-categories", transactionCategoryCreate);
router.get("/:id/transaction-categories");
router.put("/:id/transaction-categories", transactionCategoryEdit);
router.delete("/:id/transaction-categories");

export default router;
