"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const app_controller_1 = require("./app.controller");
const events_controller_1 = require("./MQTTEvents/events.controller");
const bot_service_1 = require("./bot/bot.service");
const events_service_1 = require("./MQTTEvents/events.service");
const PayloadConverter_middleware_1 = require("./MQTTEvents/PayloadConverter.middleware");
const user_schema_1 = require("./users/schemas/user.schema");
const users_controller_1 = require("./users/users.controller");
const users_service_1 = require("./users/users.service");
const bot_module_1 = require("./bot/bot.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(PayloadConverter_middleware_1.PayloadConverterMiddleware)
            .forRoutes({ path: '/events', method: common_1.RequestMethod.POST });
    }
};
AppModule = __decorate([
    common_1.Module({
        imports: [
            mongoose_1.MongooseModule.forRoot('mongodb://localhost/janus'),
            mongoose_1.MongooseModule.forFeature([{ name: 'User', schema: user_schema_1.UserSchema }]),
            bot_module_1.BotModule,
        ],
        controllers: [app_controller_1.AppController, events_controller_1.EventsController, users_controller_1.UsersController],
        components: [events_service_1.EventsService, bot_service_1.default, users_service_1.UsersService]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map