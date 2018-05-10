import {
    Module,
    NestModule,
    MiddlewaresConsumer,
    RequestMethod
} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {AppController} from './app.controller';
import {EventsController} from './MQTTEvents/events.controller';
import BotService from './bot/bot.service';
import {EventsService} from './MQTTEvents/events.service';
import {PayloadConverterMiddleware} from './MQTTEvents/PayloadConverter.middleware';
import {UserSchema} from './users/schemas/user.schema';
import {UsersController} from './users/users.controller';
import {UsersService} from './users/users.service';
import {BotModule} from './bot/bot.module';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost/janus'),
        MongooseModule.forFeature([{name: 'User', schema: UserSchema}]),
        BotModule,
    ],
    controllers: [AppController, EventsController, UsersController],
    components: [EventsService, BotService, UsersService]
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewaresConsumer): void {
        consumer
            .apply(PayloadConverterMiddleware)
            .forRoutes({path: '/events', method: RequestMethod.POST});
    }
}
