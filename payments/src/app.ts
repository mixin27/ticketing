import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { errorHandler, NotfoundError, currentUser } from '@xintickets/common';

import { createChargeRouter } from './routes/new';

const app = express();
app.set('trust proxy', 1); // trust first proxy
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);
app.use(currentUser);

// routes
app.use(createChargeRouter);

app.all('*', async () => {
  throw new NotfoundError();
});

app.use(errorHandler);

export { app };
