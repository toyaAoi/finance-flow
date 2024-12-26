import { Router } from "express";
import {
  transactionCreate,
  transactionDelete,
  transactionFetchAll,
  transactionFetchOne,
  transactionUpdate,
} from "../controllers/transaction.controller.js";

const router = Router();

router.get("/", transactionFetchAll);
router.get("/:id", transactionFetchOne);
router.post("/", transactionCreate);
router.put("/:id", transactionUpdate);
router.delete("/:id", transactionDelete);

export default router;
