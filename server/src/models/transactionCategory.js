import mongoose from "mongoose";

const TransactionCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  color: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const TransactionCategory = mongoose.model(
  "TransactionCategory",
  TransactionCategorySchema
);

export default TransactionCategory;
