import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

declare global {
  var signin: () => string[];
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

global.signin = () => {
  // {"jwt":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZDU3NWVhMWNhZWNlOTRjNTQxODE5NiIsImVtYWlsIjoibWl4aW5AZ21haWwuY29tIiwiaWF0IjoxNjQxMzc5MzEwfQ.AcDTPFbnHeQ886p_YPxmXbDWZQ8l3jUchNY4VO7GAyw"}
  // build a JWT payload. { id, email }
  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: 'test@test.com',
  };

  // create JWT
  const token = jwt.sign(payload, process.env.JWT_SECRET!);

  // build session object
  const session = { jwt: token };

  // turn that session to JSON
  const sessionJSON = JSON.stringify(session);

  // take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString('base64');

  // return a string that's the cookie with the encoded data
  return [`session=${base64}`];
};
