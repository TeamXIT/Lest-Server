import dotenv from 'dotenv';
import { error } from 'console';
import {Twilio} from 'twilio';
dotenv.config();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const sid=process.env.TWILIO_ACCOUNT_SID || 'ACfa3df292805f8d2b9e6db4b90384050f';
const authToken=process.env.TWILIO_AUTH_TOKEN || 'a0c1a8fc3f682c3ce529cfbdcb267d76';
const twilioClient =new Twilio(sid,authToken);

export const SendOTP = async (otp:string,phone:string)=> {
    await twilioClient.messages.create({
        body: `Your OTP is ${otp}`,
        from: process.env.TWILIO_PHONE_NUMBER || '+15733832863',
        to: phone,
      }).then(rsp=>{
        console.log(rsp.sid);
      }).catch(error);
}