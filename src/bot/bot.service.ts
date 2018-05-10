import {Component} from '@nestjs/common';
import {UsersService} from '../users/users.service';
import {User} from '../users/interfaces/user.interface';
import {CreateUserDto} from '../users/dto/createUser.dto';
import {RTMClient} from '@slack/client';
import {find} from 'lodash';

// global._find = find;

const SlackBot = require('slackbots');
require('dotenv').config();

@Component()
export default class BotService {
    private bot;
    private rtm;

    constructor(private readonly usersService: UsersService) {
        // const bot = new SlackBot({
        //     token: process.env.TOKEN, // Add a bot https://my.slack.com/services/new/bot and put the token
        //     name: 'Janus Bot'
        // });
        // this.bot = bot;

        // console.log(find([{a: 1}], {a: 1}));
        // console.log(this.bot);

        // this.bot.on(
        //     'start',
        //     (() => {
        //         // more information about additional params https://api.slack.com/methods/chat.postMessage
        //         var params = {
        //             icon_emoji: ':robot_face:'
        //         };
        //
        //         // define channel, where bot exist. You can adjust it there https://my.slack.com/services
        //         // bot.postMessageToChannel('general', 'meow!', params);
        //
        //         // define existing username instead of 'user_name'
        //         this.bot.postMessageToUser('voja4ok', 'meow!', params);
        //
        //         // If you add a 'slackbot' property,
        //         // you will post to another user's slackbot channel instead of a direct message
        //
        //         // define private group instead of 'private_group', where bot exist
        //         // bot.postMessageToGroup('private_group', 'meow!', params);
        //     }).bind(this),
        // );

        // The client is initialized and then started to get an active connection to the platform
        const rtm = new RTMClient(process.env.TOKEN);
        rtm.start({});
        console.log(rtm);
        this.rtm = rtm;
        // global.rtm = rtm;
        rtm.addListener('team_join', this.saveNewUser, this);
    }

    // defineSlackEventType(slackEvent) {
    //     switch (slackEvent.type) {
    //         case 'message':
    //             console.log('message was received', slackEvent.text);
    //             break;
    //         case 'team_join':
    //             console.log('user joined a team', slackEvent.user);
    //             const user: CreateUserDto = {
    //                 id: slackEvent.user.id,
    //                 name: slackEvent.user.name,
    //                 role: [],
    //                 subscription: [],
    //             };
    //             this.usersService.create(user);
    //     }
    // }

    async receiveDeviceEvent(event) {
        console.log(event);
        const subscribers = await this.findSubscribers(event.topic);
        console.log('subscribers', subscribers);
        // subscribers.forEach( (subscriber: User) => {
        //     console.log(subscriber);
        //     this.bot.postTo(this.bot.getUser(subscriber.id), event.payload);
        // });

        await Promise.all(subscribers.map(async (subscriber: User) => {
            console.log('subscriber', subscriber.id);
            if (!subscriber.dm_id) {
                const dialog = await this.rtm.webClient.im.open({user: subscriber.id});
                this.rtm.sendMessage(`Message from ${event.topic} topic received, it says: ${event.payload}`, dialog.channel.id);
            } else {
                this.rtm.sendMessage(`Message from ${event.topic} topic received, it says: ${event.payload}`, subscriber.dm_id);
            }

            // console.log('user', user);
            // await this.bot.postTo(user.name, event.payload);
        }));

    }

    async saveNewUser({user}) {
        console.log('USER', user);
        const dialog = await this.rtm.webClient.im.open({user: user.id})
        // const ims_list = await this.rtm.webClient.im.list();
        // console.log('IMs', ims_list);
        // const dm = find(ims_list.ims, (im) => {
        //     console.log(im, im.user === user.id);
        //     return im.user === user.id;
        // });
        // console.log(dm);
        const createUser: CreateUserDto = {
            id: user.id,
            name: user.name,
            role: [],
            subscription: [],
            dm_id: dialog.channel.id,
        };
        console.log(createUser);
        this.usersService.create(createUser);
    }

    // async handleMessage(packet) {
    //     await this.usersService.findSubscribers(packet.topic);
    //     console.log
    // }
    //
    async findSubscribers(topic: string) {
        return await this.usersService.findSubscribers(topic);
    }

    sendPrivateMessage(user, message = 'meow!') {
        // this.bot.postMessageToUser(user.username, message, {});
    }
}
