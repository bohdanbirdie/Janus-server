"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const greetings_module_1 = require("./greetings/greetings.module");
const help_module_1 = require("./help/help.module");
let DialogsModule = class DialogsModule {
};
DialogsModule = __decorate([
    common_1.Module({
        imports: [greetings_module_1.GreetingsDialogModule, help_module_1.HelpDialogModule]
    })
], DialogsModule);
exports.DialogsModule = DialogsModule;
//# sourceMappingURL=dialogs.module.js.map