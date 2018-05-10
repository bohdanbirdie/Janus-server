import { Document } from "mongoose";

export interface User extends Document {
  readonly id: string;
  readonly name: string;
  readonly dm_id: string;
  role: string[];
  subscription: string[];
}
