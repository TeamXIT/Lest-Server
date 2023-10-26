"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkRole = void 0;
const checkRole = (role) => {
    return (req, res, next) => {
        const userRole = req.user.role; // Assuming that the user's role is stored in the JWT token
        if (userRole === role) {
            next(); // User has the required role, continue
        }
        else {
            res.status(403).json({ message: 'Permission denied' }); // User doesn't have the required role
        }
    };
};
exports.checkRole = checkRole;
