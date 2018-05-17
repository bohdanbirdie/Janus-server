import { Module } from "@nestjs/common";
import { GreetingsDialogModule } from "./greetings/greetings.module";
import { HelpDialogModule } from "./help/help.module";
import { NotificationsModule } from "./notifications/notifications.module";
import { InitialDialogModule } from "./initial/initial.module";

@Module({
  imports: [
    InitialDialogModule,
    GreetingsDialogModule,
    HelpDialogModule,
    NotificationsModule
  ]
})
export class DialogsModule {}
