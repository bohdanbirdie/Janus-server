import {Get, Post, Controller, Body, ValidationPipe} from '@nestjs/common';
import {EventsService} from './events.service';

import { EventDto } from './dto/Event.dto';

@Controller('events')
export class EventsController {
    constructor(private readonly eventsService: EventsService) {
    }

    @Get()
    findAll() {
        return [1, 2, 3, 4];
    }

    @Post()
    receiveEvent(@Body(new ValidationPipe()) event: EventDto) {
        console.log(event);
        this.eventsService.receiveEvent(event);
    }
}
