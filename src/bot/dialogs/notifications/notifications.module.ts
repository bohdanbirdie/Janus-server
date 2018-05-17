import { Module } from "@nestjs/common";
import { NotificationsDialog } from "./notifications.dialog";

@Module({
  components: [NotificationsDialog],
  exports: [NotificationsDialog]
})
export class NotificationsModule {}
