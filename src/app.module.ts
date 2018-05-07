import {Module, NestModule, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import {AppController} from './app.controller';
import {EventsController} from './MQTTEvents/events.controller';
import BotService from "./bot/bot.service";
import {EventsService} from "./MQTTEvents/events.service";
import { PayloadConverterMiddleware } from './MQTTEvents/PayloadConverter.middleware'

@Module({
    imports: [],
    controllers: [AppController, EventsController],
    components: [EventsService, {
        provide: 'BotService',
        useClass: BotService,
    }],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewaresConsumer): void {
        consumer.apply(PayloadConverterMiddleware).forRoutes(
        { path: '/events', method: RequestMethod.POST },
    );
}
}
