import { IDialogWaterfallStep } from "botbuilder/lib/botbuilder";
import { Component } from "@nestjs/common";
import * as builder from "botbuilder";
import { Botbuilder } from "../../common/common.bot.builder";

@Component()
export class NotificationsDialog {
  private dialogId: string = "notifications";

  constructor(private readonly botBuilder: Botbuilder) {
    botBuilder.bot
      .dialog(this.dialogId, this.dialog())
      .triggerAction({ matches: /^sub/i });
  }

  dialog(): IDialogWaterfallStep[] {
    return [
      function(session, results, next) {
        builder.Prompts.choice(
          session,
          "For what type of event you'd like to subscribe?",
          ["PIR"]
        );
      },
      function(session, results, next) {
        session.userData.event = results.response.entity;
        session
          .send(
            `Alright, you have successfully subscribed to the ${
              session.userData.event
            }`
          )
          .endDialog();
        console.log(session);
      }
    ];
  }
}
