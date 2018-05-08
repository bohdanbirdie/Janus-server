import { Model } from "mongoose";
import { Component } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { UserSchema } from "./schemas/user.schema";
import { User } from "./interfaces/user.interface";
import { CreateUserDto } from "./dto/createUser.dto";

@Component()
export class UsersService {
  constructor(
    @InjectModel(UserSchema) private readonly catModel: Model<User>
  ) {}

  async create(createCatDto: CreateUserDto): Promise<User> {
    const createdUser = new this.catModel(createCatDto);
    return await createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return await this.catModel.find().exec();
  }
}
