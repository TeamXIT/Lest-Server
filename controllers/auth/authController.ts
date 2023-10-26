import { Request, Response } from 'express';
import User from '../../models/user';
import { SendOTP } from '../../utils/twilio';
import jwt from 'jsonwebtoken';
import { IUser } from '../../types/user';

export const sendOTP = async (req: Request, res: Response): Promise<void> => {
  try {
    const { phone } = req.body;

    // Check if a user with this phone number already exists
    const existingUser = await User.findOne({ phone });

    if (existingUser) {
      // User with this phone number is already registered
      const otp = Math.floor(1000 + Math.random() * 9000).toString();
      // Send OTP to the user's phone number using your OTP sending library
      console.log(otp);
      await SendOTP(otp, phone);

      // Update the user's OTP in the database
      await User.findOneAndUpdate({ phone }, { otp });

      res.status(200).json({ message: 'OTP sent successfully' });
    } else {
      // User with this phone number is not registered
      // You can handle user registration here and then send the OTP

      // For example, you can create a new user with a default role
      const newUser: IUser = new User({
        phone,
        role: 'user', // Set the user's role
      });

      await newUser.save();

      // Generate and send OTP
      const otp = Math.floor(1000 + Math.random() * 9000).toString();
      
      await SendOTP(otp, phone);

      // Update the user's OTP in the database
      await User.findOneAndUpdate({ phone }, { otp });

      res.status(200).json({ message: 'User registered, OTP sent successfully' });
    }
  } catch (error) {
    res.status(500).json({ error: 'otp sending issue' });
  }
};

export const verifyOTP = async (req: Request, res: Response): Promise<void> => {
    try {
      const { phone, otp } = req.body;
      const user = await User.findOne({ phone, otp });
      if (user) {
        // Generate a JWT token and send it back to the client
        let _secret=process.env.JWT_SECRET || '';
        const token = jwt.sign({ userId: user._id ,role:user.role }, _secret , { expiresIn: '1h' });
        res.status(200).json({ token });
      } else {
        res.status(401).json({ error: 'Invalid OTP' });
      }
    } catch (error) {
      res.status(500).json({ error: 'An error occurred' });
    }
  };