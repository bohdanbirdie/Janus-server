export class CreateUserDto {
  readonly id: string;
  readonly name: string;
  readonly dm_id: string;
  role: string[];
  subscription: string[];
}
