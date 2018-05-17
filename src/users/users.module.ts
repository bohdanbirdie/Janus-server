import { Module, NestModule } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";

@Module({
  exports: [UsersService],
  components: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
