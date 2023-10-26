"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = require("../controllers/auth/authController");
const auth_router = (0, express_1.Router)();
auth_router.post("/send-otp", authController_1.sendOTP);
auth_router.post("/verify-otp", authController_1.verifyOTP);
exports.default = auth_router;
