import mongoose from 'mongoose';

import { app } from './app';
import { natsWrapper } from './nats-wrapper';

const start = async () => {
  if (!process.env.MONGO_URI)
    throw new Error('MONGO_URI env must be specified');

  if (!process.env.JWT_SECRET)
    throw new Error('JWT_SECRET env must be specified');

  if (!process.env.NATS_CLIENT_ID)
    throw new Error('NATS_CLIENT_ID env must be specified');

  if (!process.env.NATS_URL) throw new Error('NATS_URL env must be specified');

  if (!process.env.NATS_CLUSTER_ID)
    throw new Error('NATS_CLUSTER_ID env must be specified');

  try {
    // NATS
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );
    natsWrapper.client.on('close', () => {
      console.log('NATS connection closed!');
      process.exit();
    });
    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());

    // Mongoose
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
