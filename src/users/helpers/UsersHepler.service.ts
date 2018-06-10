import {Component} from '@nestjs/common';
import {User} from '../interfaces/user.interface';
import {UserSchema} from '../schemas/user.schema';
import {IAddress} from 'botbuilder';
import {CreateUserDto} from '../dto/createUser.dto';
import {SlackHelperService} from './SlackHelper.service';
import {TelegramHelperService} from './TelegramHelper.service';
import {Channel} from '../interfaces/strategy.interface';

@Component()
export class ChannelStrategy {
    constructor(private readonly slack: SlackHelperService, private readonly telegram: TelegramHelperService) {
    }

    private selectStrategy(address: IAddress): Channel {
        if (address.channelId === 'slack') {
            return this.slack;
        }

        if (address.channelId === 'telegram') {
            return this.telegram;
        }

        return this.slack;
    }

    getUserDto(address: IAddress): CreateUserDto {
        return this.selectStrategy(address).getUserDto(address);
    }
}
