import request from "supertest";
import { app } from "../../app";
import { signin } from "../../test/setup";

it ("has a route handler listening to /api/tickets for post request", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .send({});
  expect(response.status).not.toEqual(404)
});

it ("Can only be accessed if the user is signed in", async () => {
  await request(app)
    .post("/api/tickets")
    .send({})
    .expect(401)
});

it ("returns other than 401 if the user is signed in", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", signin())
    .send({});
  console.log(response.status)
  expect(response.status).not.toEqual(401);
});

it ("returns an error if an invalid title is provided", async () => {
  
});

it ("returns an error if an invalid price is provided", async () => {
  
});

it ("creates a ticket with valid parameters", async () => {
  
});