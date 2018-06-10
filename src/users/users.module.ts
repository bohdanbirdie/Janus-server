import { Module, NestModule } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import {ChannelStrategy} from './helpers/UsersHepler.service';
import {SlackHelperService} from './helpers/SlackHelper.service';
import {TelegramHelperService} from './helpers/TelegramHelper.service';

@Module({
  exports: [UsersService],
  components: [UsersService, ChannelStrategy, SlackHelperService, TelegramHelperService],
  controllers: [UsersController]
})
export class UsersModule {}
