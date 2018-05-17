import {
  Module,
  NestModule,
  MiddlewaresConsumer,
  RequestMethod
} from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { EventsController } from "./MQTTEvents/events.controller";
import { EventsService } from "./MQTTEvents/events.service";
import { PayloadConverterMiddleware } from "./MQTTEvents/PayloadConverter.middleware";
import { UserSchema } from "./users/schemas/user.schema";
import { BotModule } from "./bot/bot.module";
import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost/janus"),
    MongooseModule.forFeature([{ name: "User", schema: UserSchema }]),
    BotModule,
    UsersModule
  ],
  controllers: [AppController, EventsController],
  components: [EventsService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewaresConsumer): void {
    consumer
      .apply(PayloadConverterMiddleware)
      .forRoutes({ path: "/events", method: RequestMethod.POST });
  }
}
