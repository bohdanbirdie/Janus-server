import { IAddress } from "botbuilder";

export class CreateUserDto {
  readonly slack_id: string;
  readonly telegram_id: string;
  readonly slack_name: string;
  readonly telegram_name: string;
  address: AddressDto;
  role: string[];
  subscription: object[];
  introduced: string[];
}

class AddressDto {
  slack: IAddress;
  telegram: IAddress;
}
