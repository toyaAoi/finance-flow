import { Schema, model } from "mongoose";

const accountSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    required: true,
    default: 0,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  transactions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Transaction",
    },
  ],
});

accountSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Account = model("Account", accountSchema);

export default Account;
