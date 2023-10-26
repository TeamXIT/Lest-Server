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
exports.verifyOTP = exports.sendOTP = void 0;
const user_1 = __importDefault(require("../../models/user"));
const twilio_1 = require("../../utils/twilio");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const sendOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { phone } = req.body;
        // Check if a user with this phone number already exists
        const existingUser = yield user_1.default.findOne({ phone });
        if (existingUser) {
            // User with this phone number is already registered
            const otp = Math.floor(1000 + Math.random() * 9000).toString();
            // Send OTP to the user's phone number using your OTP sending library
            console.log(otp);
            yield (0, twilio_1.SendOTP)(otp, phone);
            // Update the user's OTP in the database
            yield user_1.default.findOneAndUpdate({ phone }, { otp });
            res.status(200).json({ message: 'OTP sent successfully' });
        }
        else {
            // User with this phone number is not registered
            // You can handle user registration here and then send the OTP
            // For example, you can create a new user with a default role
            const newUser = new user_1.default({
                phone,
                role: 'user', // Set the user's role
            });
            yield newUser.save();
            // Generate and send OTP
            const otp = Math.floor(1000 + Math.random() * 9000).toString();
            yield (0, twilio_1.SendOTP)(otp, phone);
            // Update the user's OTP in the database
            yield user_1.default.findOneAndUpdate({ phone }, { otp });
            res.status(200).json({ message: 'User registered, OTP sent successfully' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'otp sending issue' });
    }
});
exports.sendOTP = sendOTP;
const verifyOTP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { phone, otp } = req.body;
        const user = yield user_1.default.findOne({ phone, otp });
        if (user) {
            // Generate a JWT token and send it back to the client
            let _secret = process.env.JWT_SECRET || '';
            const token = jsonwebtoken_1.default.sign({ userId: user._id, role: user.role }, _secret, { expiresIn: '1h' });
            res.status(200).json({ token });
        }
        else {
            res.status(401).json({ error: 'Invalid OTP' });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'An error occurred' });
    }
});
exports.verifyOTP = verifyOTP;
