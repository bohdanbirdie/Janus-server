import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    id: String,
    name: String,
    dm_id: String,
    role: [String],
    subscription: [String],
}, {collection: 'users'});
