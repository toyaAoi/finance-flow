const mongoose = require("mongoose");

const transactionSchema = mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  time: {
    type: Date,
    default: Date.now,
  },
  notes: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
});

transactionSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Transaction", transactionSchema);
