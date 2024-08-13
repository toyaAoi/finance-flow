const { test, after, describe, beforeEach } = require("node:test");
// const assert = require("node:assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const logger = require("../utils/logger");

const Transaction = require("../models/transaction");
const User = require("../models/user");

beforeEach(async () => {
  await Transaction.deleteMany({});
  await User.deleteMany({});
  logger.info("Database cleared");

  describe("User management", () => {
    const user = {
      name: "Test User",
      username: "tester",
      password: "password123",
    };

    test("A user can be created", () => {
      api.post("/api/users").send(user).expect(201);
    });

    test("A transaction can be created", () => {
      const transaction = {
        user: "tester",
        amount: 100,
        type: "income",
        description: "Test transaction",
      };
      api.post("/api/transactions").send(transaction).expect;
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});
