import {Component} from '@nestjs/common';
import BotService from '../bot/bot.service';

@Component()
export class EventsService {
    // public bot: BotService;

    constructor(private readonly botService: BotService) {
    }

    receiveEvent(event) {
        console.log('Received event', event); //tslint:disable-line
        this.botService.receiveDeviceEvent(event);
        // this.bot.sendPrivateMessage(
        //   { username: "voja4ok" },
        //   event.payload.toString()
        // );
    }
}
