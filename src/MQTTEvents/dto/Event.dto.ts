import {IsString, IsInt, IsBoolean} from 'class-validator';

export class EventDto {
    @IsString() readonly topic: string;

    @IsString() readonly payload: string;

    @IsString() readonly messageId: string;

    @IsInt() readonly qos: number;

    @IsBoolean() readonly retain: boolean;
}
