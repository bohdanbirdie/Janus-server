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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const events_service_1 = require("./events.service");
const Event_dto_1 = require("./dto/Event.dto");
let EventsController = class EventsController {
    constructor(eventsService) {
        this.eventsService = eventsService;
    }
    findAll() {
        return [1, 2, 3, 4];
    }
    receiveEvent(event) {
        console.log(event);
        this.eventsService.receiveEvent(event);
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EventsController.prototype, "findAll", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body(new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Event_dto_1.EventDto]),
    __metadata("design:returntype", void 0)
], EventsController.prototype, "receiveEvent", null);
EventsController = __decorate([
    common_1.Controller('events'),
    __metadata("design:paramtypes", [events_service_1.EventsService])
], EventsController);
exports.EventsController = EventsController;
//# sourceMappingURL=events.controller.js.map