import { Component, Inject } from '@nestjs/common';
import BotService from '../bot/bot.service'

interface Event {
    readonly name: string;
    readonly age: number;
    readonly breed: string;
}

@Component()
export class EventsService {

    // public bot: BotService;

    // constructor(@Inject('BotService') bot: BotService){
    //     console.log('Bot injected', bot);
    //     this.bot = bot;
    // }

    constructor(private readonly bot: BotService) {}
    // constructor() {
    //     console.log('event service constructed');
    // }

    create(cat: Event) {
        // this.cats.push(cat);
    }

    findAll(): Event[] {
        return [];
    }

    receiveEvent(event) {
        console.log('Received event', event);
        this.bot.sendPrivateMessage({username: 'voja4ok',}, event.payload.toString())
    }
}
