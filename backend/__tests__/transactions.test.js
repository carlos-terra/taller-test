import test, { beforeEach } from "node:test";
import assert from "node:assert/strict";
import request from "supertest";
import { app, transactions } from "../app.js";

beforeEach(() => {
  transactions.length = 0;
});

test("POST /transactions saves a transaction", async () => {
  const payload = { amount: 120.5, description: "Internet bill" };

  const postResponse = await request(app).post("/transactions").send(payload);

  assert.equal(postResponse.status, 201);
  assert.equal(postResponse.body.message, "Transaction created successfully.");
  assert.equal(postResponse.body.transaction.amount, payload.amount);
  assert.equal(postResponse.body.transaction.description, payload.description);
  assert.equal(transactions.length, 1);
});

test("GET /transactions returns pre-populated transactions", async () => {
  transactions.push({
    id: 1,
    amount: 50,
    description: "Preloaded transaction",
    createdAt: new Date().toISOString(),
  });

  const getResponse = await request(app).get("/transactions");

  assert.equal(getResponse.status, 200);
  assert.equal(getResponse.body.length, 1);
  assert.equal(getResponse.body[0].description, "Preloaded transaction");
});

test("POST /transactions returns error when description already exists", async () => {
  const payload = { amount: 120.5, description: "Internet bill" };

  const firstResponse = await request(app).post("/transactions").send(payload);
  assert.equal(firstResponse.status, 201);

  const duplicateResponse = await request(app)
    .post("/transactions")
    .send({ amount: 100, description: "internet bill" });

  assert.equal(duplicateResponse.status, 409);
  assert.equal(duplicateResponse.body.message, "Transaction already exists.");
});
