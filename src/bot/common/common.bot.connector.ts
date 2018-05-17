import { Component } from "@nestjs/common";
import * as builder from "botbuilder";
require("dotenv").config();

@Component()
export class BotConnector {
  connector: builder.ChatConnector;

  constructor() {
    console.log(process.env.MicrosoftAppId);
    this.connector = new builder.ChatConnector({
      appId: process.env.MicrosoftAppId,
      appPassword: process.env.MicrosoftAppPassword
    });
  }
}
