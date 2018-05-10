"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const builder = require("botbuilder");
const common_bot_connector_1 = require("./common.bot.connector");
let Botbuilder = class Botbuilder {
    constructor(botConnector) {
        this.botConnector = botConnector;
        this.bot = new builder.UniversalBot(botConnector.connector, [function (session) {
                session.send("You said: %s", session.message.text);
            }]);
    }
};
Botbuilder = __decorate([
    common_1.Component(),
    __metadata("design:paramtypes", [common_bot_connector_1.BotConnector])
], Botbuilder);
exports.Botbuilder = Botbuilder;
//# sourceMappingURL=common.bot.builder.js.map