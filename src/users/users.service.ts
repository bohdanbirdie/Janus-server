import {Model} from 'mongoose';
import {Component} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {UserSchema} from './schemas/user.schema';
import {User} from './interfaces/user.interface';
import {CreateUserDto} from './dto/createUser.dto';

@Component()
export class UsersService {
    constructor(@InjectModel(UserSchema) private readonly userModel: Model<User>) {
    }

    async create(createCatDto: CreateUserDto): Promise<User> {
        const createdUser = new this.userModel(createCatDto);
        return await createdUser.save();
    }

    async findAll(): Promise<User[]> {
        return await this.userModel.find().exec();
    }

    async findSubscribers(topic: string): Promise<User[]> {
        console.log('topic', topic);
        return await this.userModel.find({subscription: { $elemMatch: {$eq: 'pir'}}}).exec();
    }
}
