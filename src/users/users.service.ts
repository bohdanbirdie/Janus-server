import {Model} from 'mongoose';
import {Component} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {UserSchema} from './schemas/user.schema';
import {Subscription, User} from './interfaces/user.interface';
import {CreateUserDto} from './dto/createUser.dto';
import * as _ from 'lodash';
import {IAddress} from 'botbuilder';
import {NotificationEvent} from '../constants/MQTT_Events';
import {ChannelStrategy} from './helpers/UsersHepler.service';

global._ = _;

@Component()
export class UsersService {
    constructor(@InjectModel(UserSchema) private readonly userModel: Model<User>, private readonly hepler: ChannelStrategy) {
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const createdUser = new this.userModel(createUserDto);
        return await createdUser.save();
    }

    async createFromAddress(address: IAddress): Promise<User> {
        const createdUser = new this.userModel(this.hepler.getUserDto(address));
        return await createdUser.save();
    }

    async findAll(): Promise<User[]> {
        return await this.userModel.find().exec();
    }

    async findSubscribers(topic: string): Promise<User[]> {
        console.log('topic', topic);
        return await this.userModel
            .find({subscription: {$elemMatch: {type: topic}}})
            .exec();
    }

    async findBySlack(slack_id: string): Promise<User> {
        return await this.userModel.findOne({slack_id}).exec();
    }

    async findByTelegram(telegram_id: string): Promise<User> {
        return await this.userModel.findOne({telegram_id}).exec();
    }

    async findByAddress(address: IAddress): Promise<User> {
        if (address.channelId === 'slack') {
            const slack_id = address.user.id.split(':')[0];
            console.log(slack_id);
            const user = await this.findBySlack(slack_id);
            return user;
        } else {
            const user = await this.findByTelegram(address.user.id);
            return user;
        }
    }

    async subscribe(address: IAddress, event: NotificationEvent): Promise<User> {
        console.log(address, event);
        const query = {
            slack_id: '',
            telegram_id: '',
        };
        const subscription = {
            id: event.id,
            slack: false,
            telegram: false,
        };
        if (address.channelId === 'slack') {
            query.slack_id = address.user.id.split(':')[0];
            subscription.slack = true;
            console.log('slack user');
        } else {
            query.telegram_id = address.user.id;
            subscription.telegram = true;
            console.log('telegram user');
        }

        return await this.userModel.findOneAndUpdate(query, {$push: {subscription}}).exec();
    }
}
