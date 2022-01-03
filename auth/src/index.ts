import mongoose from 'mongoose';

import { app } from './app';

const start = async () => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET env must be specified');
  }

  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth');
    console.log('Connected to MongoDB!');
  } catch (error) {
    console.error(error);
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000!!!');
  });
};

start();
