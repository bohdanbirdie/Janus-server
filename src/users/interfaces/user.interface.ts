import { Document } from "mongoose";
import { IAddress } from "botbuilder";

interface Address extends Document {
  readonly type: string;
  slack: IAddress;
  telegram: IAddress;
}

export interface Subscription extends Document {
  id: string;
  slack: boolean;
  telegram: boolean;
}

export interface User extends Document {
  readonly slack_id: string;
  readonly telegram_id: string;
  readonly slack_name: string;
  readonly telegram_name: string;
  address: Address;
  role: string[];
  subscription: Subscription[];
}
