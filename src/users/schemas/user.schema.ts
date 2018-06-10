import * as mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
  type: String,
  slack: mongoose.Schema.Types.Mixed,
  telegram: mongoose.Schema.Types.Mixed
});

const SubscriptionSchema = new mongoose.Schema({
  id: String,
  slack: Boolean,
  telegram: Boolean
});

export const UserSchema = new mongoose.Schema(
  {
    slack_id: String,
    telegram_id: String,
    slack_name: String,
    telegram_name: String,
    address: AddressSchema,
    role: [String],
    subscription: [SubscriptionSchema],
    introduced: [String]
  },
  { collection: "users" }
);
