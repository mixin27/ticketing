import mongoose from 'mongoose';

import { app } from './app';

const start = async () => {
  console.log('Starting auth service up...');

  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI env must be specified');
  }

  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET env must be specified');
  }

  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(error);
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000!!!');
  });
};

start();
