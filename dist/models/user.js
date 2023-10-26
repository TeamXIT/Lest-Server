"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userRole_1 = __importDefault(require("../enums/userRole"));
const userSchema = new mongoose_1.Schema({
    name: { type: String },
    email: { type: String },
    phone: { type: String, required: true, unique: true },
    otp: { type: String },
    role: { type: String, enum: Object.values(userRole_1.default), default: userRole_1.default.User },
});
exports.default = (0, mongoose_1.model)('User', userSchema);
