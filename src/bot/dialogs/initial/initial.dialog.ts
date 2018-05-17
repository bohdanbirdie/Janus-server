import { IDialogWaterfallStep } from "botbuilder/lib/botbuilder";
import { Component, Inject } from "@nestjs/common";
import * as builder from "botbuilder";
import { Botbuilder } from "../../common/common.bot.builder";
import { UsersService } from "../../../users/users.service";

@Component()
export class InitialDialog {
  private dialogId: string = "firstRun";

  constructor(
    private readonly botBuilder: Botbuilder,
    private readonly usersService: UsersService
  ) {
    botBuilder.bot.dialog(this.dialogId, this.dialog()).triggerAction({
      onFindAction: (context, callback) => {
        // Only trigger if we've never seen user before
        if (!context.userData.firstRun) {
          // Return a score of 1.1 to ensure the first run dialog wins
          callback(null, 1.1);
        } else {
          callback(null, 0.0);
        }
      }
    });
  }

  dialog(): IDialogWaterfallStep[] {
    return [
      session => {
        session.userData.firstRun = true;
        console.log(session);
        session.send("Welcome to the Janus bot").endDialog();
        this.usersService.createFromAddress(session.message.address);
      }
    ];
  }
}
