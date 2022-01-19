import express from 'express';
import 'express-async-errors';
import cookieSession from 'cookie-session';
import { errorHandler, NotfoundError, currentUser } from '@xintickets/common';

import { createOrderRouter } from './routes/new';
import { deleteOrderRouter } from './routes/delete';
import { indexOrderRouter } from './routes';
import { showOrderRouter } from './routes/show';

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

app.use(createOrderRouter);
app.use(indexOrderRouter);
app.use(showOrderRouter);
app.use(deleteOrderRouter);

app.all('*', async () => {
  throw new NotfoundError();
});

app.use(errorHandler);

export { app };
