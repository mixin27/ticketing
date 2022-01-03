import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';

import { app } from '../app';

declare global {
  var signin: () => Promise<string[]>;
}

let conn: any;
let mongoServer: any;

beforeAll(async () => {
  process.env.JWT_SECRET = 'asdf';

  mongoServer = await MongoMemoryServer.create();
  conn = await mongoose.connect(mongoServer.getUri());
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (conn) {
    await mongoose.disconnect();
  }

  if (mongoServer) {
    await mongoServer.stop();
  }
});

global.signin = async () => {
  const email = 'test@test.com';
  const password = 'password';

  const response = await request(app)
    .post('/api/users/signup')
    .send({ email, password })
    .expect(201);

  const cookie = response.get('Set-Cookie');

  return cookie;
};
