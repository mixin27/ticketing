import mongoose from 'mongoose';

import { app } from './app';

const start = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error('MONGO_URI env must be specified');
  }

  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET env must be specified');
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB!');
  } catch (error) {
    console.error(error);
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000!!!');
  });
};

start();
