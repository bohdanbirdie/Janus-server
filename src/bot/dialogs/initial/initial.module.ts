import { Module } from "@nestjs/common";
import { InitialDialog } from "./initial.dialog";
import { UsersModule } from "../../../users/users.module";

@Module({
  components: [InitialDialog],
  exports: [InitialDialog],
  imports: [UsersModule]
})
export class InitialDialogModule {}
