"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./config/db");
const todo_1 = __importDefault(require("./routes/todo"));
const auth_1 = __importDefault(require("./routes/auth"));
const loggerMiddleware_1 = __importDefault(require("./middleware/loggerMiddleware"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use(loggerMiddleware_1.default);
(0, db_1.connectDB)();
app.use(express_1.default.json());
app.use('/api', todo_1.default);
app.use('/api', auth_1.default);
app.get('/', (req, res) => {
    res.send('Welcome to Node Server');
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
