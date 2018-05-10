"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.UserSchema = new mongoose.Schema({
    id: String,
    name: String,
    dm_id: String,
    role: [String],
    subscription: [String],
}, { collection: 'users' });
//# sourceMappingURL=user.schema.js.map