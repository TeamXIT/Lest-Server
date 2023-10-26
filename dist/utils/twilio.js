"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendOTP = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const console_1 = require("console");
const twilio_1 = require("twilio");
dotenv_1.default.config();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const sid = process.env.TWILIO_ACCOUNT_SID || 'ACfa3df292805f8d2b9e6db4b90384050f';
const authToken = process.env.TWILIO_AUTH_TOKEN || 'a0c1a8fc3f682c3ce529cfbdcb267d76';
const twilioClient = new twilio_1.Twilio(sid, authToken);
const SendOTP = (otp, phone) => __awaiter(void 0, void 0, void 0, function* () {
    yield twilioClient.messages.create({
        body: `Your OTP is ${otp}`,
        from: process.env.TWILIO_PHONE_NUMBER || '+15733832863',
        to: phone,
    }).then(rsp => {
        console.log(rsp.sid);
    }).catch(console_1.error);
});
exports.SendOTP = SendOTP;
