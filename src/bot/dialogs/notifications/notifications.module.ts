import {Module} from '@nestjs/common';
import {NotificationsDialog} from './notifications.dialog';
import {UsersModule} from '../../../users/users.module';

@Module({
    components: [NotificationsDialog],
    exports: [NotificationsDialog],
    imports: [UsersModule],
})
export class NotificationsModule {
}
