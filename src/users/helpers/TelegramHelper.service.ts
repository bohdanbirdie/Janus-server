import {Component} from '@nestjs/common';
import {IAddress} from 'botbuilder';
import {CreateUserDto} from '../dto/createUser.dto';
import {Channel} from '../interfaces/strategy.interface';
import * as _ from 'lodash';

@Component()
export class TelegramHelperService implements Channel {
    constructor() {
    }

    getUserDto(address: IAddress): CreateUserDto {
        console.log('TelegramHelperService', address);
        const user: CreateUserDto = {
            slack_id: '',
            slack_name: '',
            telegram_id: address.user.id,
            telegram_name: address.user.name,
            address: {
                slack: null,
                telegram: _.omit(address, ['conversation']),
            },
            subscription: [],
            role: [],
            introduced: [],
        };

        return user;
    }
}
