import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
var mosca = require('mosca');
var SlackBot = require('slackbots');

var settings = {
    port: 1883,
};

var server = new mosca.Server(settings);

server.on('clientConnected', function(client) {
    console.log('client connected', client.id);
});

// fired when a message is received
server.on('published', function(packet, client) {
    console.log('Published', packet.payload);
});

server.on('ready', setup);

// fired when the mqtt server is ready
function setup() {
    console.log('Mosca server is up and running');
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();


// create a bot
var bot = new SlackBot({
    token: 'xoxb-358447608069-Fy6B47k43dhPNrLOy2woqbbJ', // Add a bot https://my.slack.com/services/new/bot and put the token
    name: 'Janus'
});

console.log(bot);

bot.on('start', function() {
    // more information about additional params https://api.slack.com/methods/chat.postMessage
    var params = {
        icon_emoji: ':cat:'
    };

    // define channel, where bot exist. You can adjust it there https://my.slack.com/services
    bot.postMessageToChannel('general', 'meow!', params);

    // define existing username instead of 'user_name'
    bot.postMessageToUser('user_name', 'meow!', params);

    // If you add a 'slackbot' property,
    // you will post to another user's slackbot channel instead of a direct message
    bot.postMessageToUser('user_name', 'meow!', { 'slackbot': true, icon_emoji: ':cat:' });

    // define private group instead of 'private_group', where bot exist
    bot.postMessageToGroup('private_group', 'meow!', params);
});
