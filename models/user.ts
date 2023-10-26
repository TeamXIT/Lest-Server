import { model, Schema } from "mongoose"
import { IUser } from "../types/user";
import UserRole from "../enums/userRole";

const userSchema = new Schema<IUser>({
    name: { type: String},
    email: { type: String},
    phone: { type: String, required: true, unique: true },
    otp: { type: String },
    role: { type: String, enum: Object.values(UserRole), default: UserRole.User },
  });
  
  export default model<IUser>('User', userSchema);