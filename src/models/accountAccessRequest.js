import { Schema, model } from "mongoose";

const accountAccessRequestSchema = new Schema({
  requester: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  account: {
    type: Schema.Types.ObjectId,
    ref: "Account",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

const AccountAccessRequest = model(
  "AccountAccessRequest",
  accountAccessRequestSchema
);

export default AccountAccessRequest;
