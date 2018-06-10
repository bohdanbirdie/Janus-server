import {IDialogWaterfallStep} from 'botbuilder/lib/botbuilder';
import {Component} from '@nestjs/common';
import * as builder from 'botbuilder';
import {Botbuilder} from '../../common/common.bot.builder';
import {UsersService} from '../../../users/users.service';
import {en} from '../../../constants/messages';

@Component()
export class InitialDialog {
    private dialogId: string = 'firstRun';

    constructor(private readonly botBuilder: Botbuilder,
                private readonly usersService: UsersService) {
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
            (session, results, next) => {
                session.userData.firstRun = true;
                console.log(session);
                const customMessage = new builder.Message(session)
                    .text(en.firstRun.welcome)
                    .textFormat('markdown');
                this.usersService.createFromAddress(session.message.address);
                session.send(customMessage);
                next();
            },
            (session, results, next) => {
                builder.Prompts.choice(
                    session,
                    en.firstRun.hint,
                    ['Subscribe', 'Connect', 'Assign', 'Help'],
                );
            },
            (session, results, next) => {
                session.endDialog(`Thanks you, initializing ${results.response.entity.toLowerCase()} action.....`);
                switch (results.response.entity.toLowerCase()) {
                    case 'subscribe':
                        session.beginDialog('notifications');
                        break;

                    default:
                        session.beginDialog('help');
                        break;
                }

            }
        ];
    }
}
