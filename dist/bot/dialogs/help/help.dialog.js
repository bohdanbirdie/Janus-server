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
const common_bot_builder_1 = require("../../common/common.bot.builder");
let HelpDialog = class HelpDialog {
    constructor(botBuilder) {
        this.botBuilder = botBuilder;
        this.dialogId = 'help';
        botBuilder.bot.dialog(this.dialogId, this.dialog).triggerAction({ matches: /^help/i });
    }
    dialog(session, results, next) {
        session.send("I'm a simple echo bot.");
    }
};
HelpDialog = __decorate([
    common_1.Component(),
    __metadata("design:paramtypes", [common_bot_builder_1.Botbuilder])
], HelpDialog);
exports.HelpDialog = HelpDialog;
//# sourceMappingURL=help.dialog.js.map