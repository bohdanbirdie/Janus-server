const axios = require("axios");
require("dotenv").config();
var mosca = require("mosca");
var settings = {
    port: 1883
};
var server = new mosca.Server(settings);
server.on("clientConnected", function (client) {
    console.log("client connected", client.id);
});
server.on("published", function (packet, client) {
    console.log(packet);
    axios
        .post(`http://${process.env.HOST}:${process.env.PORT}/events`, Object.assign({}, packet))
        .then(response => {
        console.log("success");
    })
        .catch(err => {
        console.log("error");
        console.log(`${process.env.HOST}:${process.env.PORT}/events`);
    });
});
server.on("ready", setup);
function setup() {
    console.log("Mosca server is up and running");
}
//# sourceMappingURL=broker.js.map