import mongoose from "mongoose";

const TransactionCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
});

const TransactionCategory = mongoose.model(
  "TransactionCategory",
  TransactionCategorySchema
);

export default TransactionCategory;
