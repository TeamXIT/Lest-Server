import { ConnectOptions, ServerApiVersion } from 'mongodb';
import mongoose from 'mongoose';

export const connectDB = async ()=> {
    await mongoose.connect(process.env.MONGO_URI!, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        }
      });
    console.log('MongoDb Connected');   
}