import { Get, Post, Controller, Body } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./interfaces/user.interface";
import { CreateUserDto } from "./dto/createUser.dto";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    this.usersService.create(createUserDto);
  }
}
