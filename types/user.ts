import UserRole from "../enums/userRole";
import { Document } from "mongoose"
export interface IUser extends Document {
    name: string;
    email: string;
    phone: string;
    otp: string;
    role: UserRole;
  }