import {Component} from '@nestjs/common';
import {IAddress} from 'botbuilder';
import {CreateUserDto} from '../dto/createUser.dto';
import {Channel} from '../interfaces/strategy.interface';
import * as _ from 'lodash';

@Component()
export class SlackHelperService implements Channel {
    constructor() {
    }

    getUserDto(address: IAddress): CreateUserDto {
        console.log('SlackHelperService', address);
        const user: CreateUserDto = {
            slack_id: address.user.id.split(':')[0],
            slack_name: address.user.name,
            telegram_id: '',
            telegram_name: '',
            address: {
                slack: _.omit(address, ['conversation']),
                telegram: null,
            },
            subscription: [],
            role: [],
            introduced: [],
        };

        return user;
    }
}
