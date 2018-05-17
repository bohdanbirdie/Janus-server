import { Model } from "mongoose";
import { Component } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { UserSchema } from "./schemas/user.schema";
import { User } from "./interfaces/user.interface";
import { CreateUserDto } from "./dto/createUser.dto";
import * as _ from "lodash";
import { IAddress } from "botbuilder";
global._ = _;

@Component()
export class UsersService {
  constructor(
    @InjectModel(UserSchema) private readonly userModel: Model<User>
  ) {
    console.log(_.omit);
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return await createdUser.save();
  }

  async createFromAddress(address: IAddress): Promise<User> {
    const prepare = {
      slack_id: "",
      slack_name: "",
      telegram_id: "",
      telegram_name: "",
      address: {
        slack: null,
        telegram: null
      },
      subscription: [],
      role: [],
      introduced: []
    };

    if (address.channelId === "slack") {
      prepare.slack_id = address.user.id.split(":")[0];
      prepare.slack_name = address.user.name;
      prepare.address.slack = _.omit(address, ["conversation"]);
      console.log("slack user");
    } else {
      prepare.telegram_id = address.user.id;
      prepare.telegram_name = address.user.name;
      prepare.address.telegram = _.omit(address, ["conversation"]);
      console.log("telegram user");
    }

    console.log("prepare", prepare);
    const user: CreateUserDto = { ...prepare };
    const createdUser = new this.userModel(user);
    return await createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return await this.userModel.find().exec();
  }

  async findSubscribers(topic: string): Promise<User[]> {
    console.log("topic", topic);
    return await this.userModel
      .find({ subscription: { $elemMatch: { type: topic } } })
      .exec();
  }

  async findBySlack(slack_id: string): Promise<User> {
    return await this.userModel.findOne({ slack_id }).exec();
  }

  async findByTelegram(telegram_id: string): Promise<User> {
    return await this.userModel.findOne({ telegram_id }).exec();
  }

  async fixUserAddress(address: object): Promise<User[]> {
    if (address.channelId === "slack") {
      const slack_id = address.user.id.split(":")[0];
      const user = await this.findBySlack(slack_id);
    } else {
      const user = await this.findByTelegram(address.user.id);
      console.log("telegram user");
    }
  }
}
