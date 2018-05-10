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
const common_bot_builder_1 = require("../../common/common.bot.builder");
let GreetingsDialog = class GreetingsDialog {
    constructor(botBuilder) {
        this.botBuilder = botBuilder;
        this.dialogId = 'greetings';
        botBuilder.bot.dialog(this.dialogId, this.dialog()).triggerAction({ matches: /^hello/i });
    }
    dialog() {
        return [
            function (session, results, next) {
                builder.Prompts.text(session, "Hello... What's your name?");
            },
            function (session, results, next) {
                session.userData.name = results.response;
                builder.Prompts.number(session, "Hi " + results.response + ", How many years have you been coding?");
            },
            function (session, results, next) {
                session.userData.coding = results.response;
                builder.Prompts.choice(session, "What Node.js Frameworks do you use ?", ["Express", "Nest", "Meteor"]);
            },
            function (session, results, next) {
                session.userData.language = results.response.entity;
                session.send("Got it... " + session.userData.name +
                    " you've been programming for " + session.userData.coding +
                    " years and use " + session.userData.language + ".");
            }
        ];
    }
};
GreetingsDialog = __decorate([
    common_1.Component(),
    __metadata("design:paramtypes", [common_bot_builder_1.Botbuilder])
], GreetingsDialog);
exports.GreetingsDialog = GreetingsDialog;
//# sourceMappingURL=greetings.dialog.js.map