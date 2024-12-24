import express, { json } from 'express';
import cors from 'cors';
import router from './routes/index.js';
import connectDB from './db/db.js';
import connectCloudinary from './config/cloudinary.js';

const app = express();

//Connections
await connectDB();
await connectCloudinary();

//Niddlewares
app.use(json());
app.use(cors());
app.use('/api', router);

//Not Found
app.use((req, res, next) => {
  res.status(404).json({
    message: 'Not Found',
  });
});

export default app;
