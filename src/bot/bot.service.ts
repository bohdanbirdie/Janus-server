import {Component} from '@nestjs/common';
import {UsersService} from '../users/users.service';
import {User} from '../users/interfaces/user.interface';
import {find} from 'lodash';

global._find = find; //tslint:disable-line

require('dotenv').config(); //tslint:disable-line

@Component()
export default class BotService {
    constructor(private readonly usersService: UsersService) {
    }

    async receiveDeviceEvent(event) {
        console.log(event);
        const subscribers = await this.findSubscribers(event.topic);
        console.log('subscribers', subscribers);

        await Promise.all(
            subscribers.map(async (subscriber: User) => {
                console.log('subscriber', subscriber);
            })
        );
    }

    async findSubscribers(topic: string) {
        return await this.usersService.findSubscribers(topic);
    }
}
