export class CreateUserDto {
  readonly id: string;
  readonly name: string;
  role: string[];
  subscription: string[];
}
