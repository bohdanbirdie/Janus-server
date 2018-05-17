import { Component } from "@nestjs/common";
import { UniversalBot } from "botbuilder/lib/botbuilder";
import * as builder from "botbuilder";
import { BotConnector } from "./common.bot.connector";
import { MongoDbStorage } from "botbuilder-mongodb-storage";

@Component()
export class Botbuilder {
  bot: UniversalBot;

  constructor(private readonly botConnector: BotConnector) {
    this.bot = new builder.UniversalBot(botConnector.connector, [
      function(session) {
        console.log(session.message.address);
        session.send("You said: %s", session.message.text);
      }
    ]).set(
      "storage",
      new MongoDbStorage({
        DatabaseName: "janus",
        collectionName: "botState",
        mongoIp: "127.0.0.1",
        mongoPort: "27017"
        // mongoIp: "ds125578.mlab.com",
        // mongoPort: "255xx",
        // username: "myUserAdmin",
        // password: "testtest123"
      })
    );
  }
}
