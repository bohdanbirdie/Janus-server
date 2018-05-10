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
const common_bot_connector_1 = require("../common/common.bot.connector");
let MessagesMiddleware = class MessagesMiddleware {
    constructor(botConnector) {
        this.botConnector = botConnector;
        this.connectorListener = botConnector.connector.listen();
    }
    resolve(...args) {
        return (req, res, next) => {
            this.connectorListener(req, res);
        };
    }
};
MessagesMiddleware = __decorate([
    common_1.Middleware(),
    __metadata("design:paramtypes", [common_bot_connector_1.BotConnector])
], MessagesMiddleware);
exports.MessagesMiddleware = MessagesMiddleware;
//# sourceMappingURL=messages.middleware.js.map