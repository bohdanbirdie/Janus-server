import {IAddress} from 'botbuilder';
import {CreateUserDto} from '../dto/createUser.dto';

export interface Channel {
    getUserDto(address: IAddress): CreateUserDto;
}
