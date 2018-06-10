import {IDialogWaterfallStep} from 'botbuilder/lib/botbuilder';
import {Component} from '@nestjs/common';
import * as builder from 'botbuilder';
import {Botbuilder} from '../../common/common.bot.builder';
import {UsersService} from '../../../users/users.service';
import {User} from '../../../users/interfaces/user.interface';
import {eventsList, NotificationEvent} from '../../../constants/MQTT_Events';
import * as _ from 'lodash';

@Component()
export class NotificationsDialog {
    private dialogId: string = 'notifications';

    constructor(private readonly botBuilder: Botbuilder, private readonly usersService: UsersService) {
        botBuilder.bot
            .dialog(this.dialogId, this.dialog())
            .triggerAction({matches: /^sub/i});
    }

    dialog(): IDialogWaterfallStep[] {
        return [
            async (session, results, next) => {
                const user: User = await this.usersService.findByAddress(session.message.address);
                const used_events = {};
                console.log(user.subscription);
                _.forEach(user.subscription, (event) => {
                    used_events[event.id] = true;
                    console.log(event.id, event.slack);
                }, []);
                const available_events = _.filter(eventsList, (event: NotificationEvent) => {
                    return !used_events[event.id];
                }, []);

                session.userData.used_events = used_events;
                session.userData.available_events = available_events;
                console.log(available_events)
                if(available_events.length) {
                    builder.Prompts.choice(
                        session,
                        'For what type of event you\'d like to subscribe?',
                        [..._.map(available_events, (event) => event.name, [])]
                    );
                } else {
                    session
                        .send('Sorry, unfortunately you don\'t have any available events at the moment.')
                        .endDialog();
                }
            },
            async (session, results, next) => {
                await this.usersService.subscribe(session.message.address, _.find(eventsList, {name: results.response.entity}));
                session
                    .send(`Alright, you have successfully subscribed to the ${session.userData.event}`)
                    .endDialog();
                console.log(session);
            }
        ];
    }
}
