import { Get, Post, Controller, Body, ValidationPipe } from '@nestjs/common';
import { IsString, IsInt, IsBoolean } from 'class-validator';
import { EventsService } from './events.service'

class EventDto {
    @IsString()
    readonly topic: string;

    @IsString()
    readonly payload: string;

    @IsString()
    readonly messageId: string;

    @IsInt()
    readonly qos: number;

    @IsBoolean()
    readonly retain: boolean
}

@Controller('events')
export class EventsController {
    constructor(private readonly eventsService: EventsService) {}

    @Get()
    findAll() {
        return [1,2,3,4];
    }

    @Post()
    receiveEvent(@Body(new ValidationPipe()) event: EventDto) {
        console.log(event);
        this.eventsService.receiveEvent(event);
    }
}
