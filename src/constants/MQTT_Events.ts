export interface NotificationEvent {
    readonly id: string;
    readonly name: string;
    readonly short_description: string;
    readonly description: string;
}

export const PIR: NotificationEvent = {
    id: 'PIR',
    name: 'PIR',
    short_description: 'PIR module',
    description: 'PIR module notification are sent when module recognize any movement on the field of view.',
};

export const RFID_USED: NotificationEvent = {
    id: 'RFID_USED',
    name: 'Card used',
    short_description: 'RFID card usage',
    description: 'RFID reader notification are sent when someone have use recognized RFID card.',
};

export const RFID_NEW_CARD = {
    id: 'RFID_NEW_CARD',
    name: 'Card unrecognized',
    short_description: 'RFID card unrecognized',
    description: 'RFID reader notification are sent when someone have use unrecognized RFID card.',
};

export const eventsList = [PIR, RFID_NEW_CARD, RFID_USED];
