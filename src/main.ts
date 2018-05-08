import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { EventsController } from "MQTTEvents/events.controller";
import { PIR_SENSOR } from "./constants/MQTT_Events";
require("dotenv").config();

import botAPP from "./bot/bot.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT);
  // const bot = botAPP(app);
}
bootstrap();
