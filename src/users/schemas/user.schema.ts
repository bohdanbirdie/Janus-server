import * as mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
  id: String,
  name: String,
  role: [String],
  subscription: [String]
});
