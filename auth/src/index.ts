import express from 'express';
import 'express-async-errors';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';

import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/singup';
import { errorHandler } from './middlewares/error-handler';
import { NotfoundError } from './errors/not-found-error';

const app = express();
app.set('trust proxy', 1); // trust first proxy
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
    secure: true,
  })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', async () => {
  throw new NotfoundError();
});

app.use(errorHandler);

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
