import { Router } from "express"
import { sendOTP,verifyOTP} from "../controllers/auth/authController"

const auth_router: Router = Router()

auth_router.post("/send-otp", sendOTP)

auth_router.post("/verify-otp", verifyOTP)

export default auth_router