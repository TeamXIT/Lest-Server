import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { connectDB } from "./config/db";
import todoRoutes from "./routes/todo";
import authRoutes from "./routes/auth"
import loggerMiddleware from './middleware/loggerMiddleware'; 
dotenv.config();

const app: Express = express();
const port =process.env.PORT;
app.use(loggerMiddleware);
connectDB();
app.use(express.json()); 
app.use('/api',todoRoutes);
app.use('/api',authRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Node Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});