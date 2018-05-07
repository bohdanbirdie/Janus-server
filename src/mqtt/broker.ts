const axios = require('axios');
require("dotenv").config();

var mosca = require('mosca');

var settings = {
    port: 1883,
};

var server = new mosca.Server(settings);

server.on('clientConnected', function (client) {
    console.log('client connected', client.id);
});

// fired when a message is received
server.on('published', function (packet, client) {
    // if(packet.topic === "presence") {
    //     console.log('Published presence');
    console.log(packet);
    // bot.postMessageToUser('voja4ok', packet.payload.toString());
    // }
    axios.post(`http://${process.env.HOST}:${process.env.PORT}/events`, {...packet}).then((response) => {
        // console.log(response)
        console.log('success');
    }).catch((err) => {
        console.log('error');
        console.log(`${process.env.HOST}:${process.env.PORT}/events`);
    })
});

server.on('ready', setup);

// fired when the mqtt server is ready
function setup() {
    console.log('Mosca server is up and running');
}
