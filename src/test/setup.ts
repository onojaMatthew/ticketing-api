import { MongoMemoryServer } from "mongodb-memory-server";
import jwt from "jsonwebtoken";
import { app } from "../app";
import mongoose from "mongoose";

let mongo: any;

beforeAll(async() => {
  process.env.JWT_KEY = "SOMEowndjssfrwi";
  mongo = await MongoMemoryServer.create();
  const mongoUri = await mongo.getUri();
  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({})
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
})

export const signin = () => {
  const payload = {
    id: "dlsidiroandsfag",
    email: "email@domain.com"
  }

  const token = jwt.sign(payload, process.env.JWT_KEY!);

  const session = { jwt: token };

  const sessionJSON = JSON.stringify(session);

  const base64 = Buffer.from(sessionJSON).toString("base64");
  return [`express:sess=${base64}`];
}