import { Request, Response, NextFunction } from 'express';
import { IUser } from '../types/user';

// Extend the Request type to include a 'user' property
declare global {
  namespace Express {
    interface Request {
      user: IUser; // Assuming 'IUser' is your user type
    }
  }
}

export const checkRole = (role: string) => {
  return (req: Request , res: Response, next: NextFunction) => {
    const userRole = req.user.role; // Assuming that the user's role is stored in the JWT token
    if (userRole === role) {
      next(); // User has the required role, continue
    } else {
      res.status(403).json({ message: 'Permission denied' }); // User doesn't have the required role
    }
  };
};