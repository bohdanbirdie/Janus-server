import { EventsController } from "../MQTTEvents/events.controller";
import { Component } from "@nestjs/common";

const SlackBot = require("slackbots");
require("dotenv").config();

@Component()
export default class BotService {
  private bot;

  constructor() {
    // console.log('EventsController', app.get(EventsController));
    const bot = new SlackBot({
      token: process.env.TOKEN, // Add a bot https://my.slack.com/services/new/bot and put the token
      name: "Janus Bot"
    });
    this.bot = bot;

    console.log(this.bot);

    this.bot.on(
      "start",
      (() => {
        // more information about additional params https://api.slack.com/methods/chat.postMessage
        var params = {
          icon_emoji: ":robot_face:"
        };

        // define channel, where bot exist. You can adjust it there https://my.slack.com/services
        // bot.postMessageToChannel('general', 'meow!', params);

        // define existing username instead of 'user_name'
        this.bot.postMessageToUser("voja4ok", "meow!", params);

        // If you add a 'slackbot' property,
        // you will post to another user's slackbot channel instead of a direct message

        // define private group instead of 'private_group', where bot exist
        // bot.postMessageToGroup('private_group', 'meow!', params);
      }).bind(this)
    );

    /**
     * @param {object} data
     */
    this.bot.on(
      "message",
      (packet => {
        // all ingoing MQTTEvents https://api.slack.com/rtm
        console.log(packet);
        // if(packet.topic === 'pir'){
        //     this.sendPrivateMessage(this.findSubscribers())
        // }
      }).bind(this)
    );
  }

  findSubscribers() {
    return [
      {
        username: "voja4ok"
      }
    ];
  }

  sendPrivateMessage(user, message = "meow!") {
    this.bot.postMessageToUser(user.username, message, {});
  }
}
