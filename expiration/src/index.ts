import { natsWrapper } from './nats-wrapper';
import { OrderCreatedListener } from './events/listeners/order-created-listener';

const start = async () => {
  if (!process.env.NATS_CLIENT_ID)
    throw new Error('NATS_CLIENT_ID env must be specified');

  if (!process.env.NATS_URL) throw new Error('NATS_URL env must be specified');

  if (!process.env.NATS_CLUSTER_ID)
    throw new Error('NATS_CLUSTER_ID env must be specified');

  if (!process.env.REDIS_HOST)
    throw new Error('REDIS_HOST env must be specified');

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

    new OrderCreatedListener(natsWrapper.client).listen();
  } catch (error) {
    console.error(error);
  }
};

start();
