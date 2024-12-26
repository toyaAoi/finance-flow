import { Router } from "express";
import {
  transactionCategoryCreate,
  transactionCategoryEdit,
} from "../controllers/transactionCategory.controller.js";

const router = Router();

router.post("/", transactionCategoryCreate);
router.put("/:id", transactionCategoryEdit);

export default router;
