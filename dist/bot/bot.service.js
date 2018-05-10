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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const client_1 = require("@slack/client");
const SlackBot = require('slackbots');
require('dotenv').config();
let BotService = class BotService {
    constructor(usersService) {
        this.usersService = usersService;
        const rtm = new client_1.RTMClient(process.env.TOKEN);
        rtm.start({});
        console.log(rtm);
        this.rtm = rtm;
        rtm.addListener('team_join', this.saveNewUser, this);
    }
    receiveDeviceEvent(event) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(event);
            const subscribers = yield this.findSubscribers(event.topic);
            console.log('subscribers', subscribers);
            yield Promise.all(subscribers.map((subscriber) => __awaiter(this, void 0, void 0, function* () {
                console.log('subscriber', subscriber.id);
                if (!subscriber.dm_id) {
                    const dialog = yield this.rtm.webClient.im.open({ user: subscriber.id });
                    this.rtm.sendMessage(`Message from ${event.topic} topic received, it says: ${event.payload}`, dialog.channel.id);
                }
                else {
                    this.rtm.sendMessage(`Message from ${event.topic} topic received, it says: ${event.payload}`, subscriber.dm_id);
                }
            })));
        });
    }
    saveNewUser({ user }) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('USER', user);
            const dialog = yield this.rtm.webClient.im.open({ user: user.id });
            const createUser = {
                id: user.id,
                name: user.name,
                role: [],
                subscription: [],
                dm_id: dialog.channel.id,
            };
            console.log(createUser);
            this.usersService.create(createUser);
        });
    }
    findSubscribers(topic) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.usersService.findSubscribers(topic);
        });
    }
    sendPrivateMessage(user, message = 'meow!') {
    }
};
BotService = __decorate([
    common_1.Component(),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], BotService);
exports.default = BotService;
//# sourceMappingURL=bot.service.js.map