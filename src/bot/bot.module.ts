import { Module, NestModule } from "@nestjs/common";
import { BotCommonModule } from "./common/common.bot.module";
import { MessagesModule } from "./messages/messages.module";
import { DialogsModule } from "./dialogs/dialogs.module";
import BotService from "./bot.service";

@Module({
  imports: [BotCommonModule, MessagesModule, DialogsModule],
  components: [BotService],
  exports: [BotService]
})
export class BotModule {}
