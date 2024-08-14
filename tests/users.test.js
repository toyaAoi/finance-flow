const { describe, it, after } = require("node:test");
const assert = require("node:assert");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const mongoose = require("mongoose");
const User = require("../models/user");

describe.only("Users", async () => {
  // Clear Database
  await User.deleteMany({});

  describe("user creation", () => {
    it("should be able to create a new account", async () => {
      const user = {
        name: "tester",
        username: "tester",
        password: "tester",
      };

      const response = await api.post("/api/users").send(user);
      assert.equal(response.status, 201);
    });

    it("should not be able to create a new account with an existing username", async () => {
      const user = {
        name: "tester",
        username: "tester",
        password: "tester",
      };

      const response = await api.post("/api/users").send(user);
      assert.equal(response.status, 400);
      assert.strictEqual(response.body.error, "username already taken");
    });
    it("should not be able to create a new account without password", async () => {
      const user = {
        name: "tester2",
        username: "tester2",
      };
      const response = await api.post("/api/users").send(user);
      assert.equal(response.status, 400);
    });
    it("should not be able to create a new account without username", async () => {
      const user = {
        name: "tester2",
        password: "tester2",
      };
      const response = await api.post("/api/users").send(user);
      assert.equal(response.status, 400);
    });
  });
  describe.only("user login", () => {
    it("should be able to login with valid credentials", async () => {
      const user = {
        username: "tester",
        password: "tester",
      };

      const response = await api.post("/api/login").send(user);
      assert.equal(response.status, 200);
    });

    it("should not be able to login with invalid credentials", async () => {
      const user = {
        username: "tester",
        password: "wrongPassword",
      };

      const response = await api.post("/api/login").send(user);
      assert.equal(response.status, 401);
      assert.strictEqual(response.body.error, "invalid username or password");
    });

    it("should not be able to login without username", async () => {
      const user = {
        password: "tester",
      };

      const response = await api.post("/api/login").send(user);
      console.log("Error:", response.body);
      assert.equal(response.status, 400);
      assert.strictEqual(response.body.error, "missing username or password");
    });

    it.only("should not be able to login without password", async () => {
      const user = {
        username: "tester",
      };

      const response = await api.post("/api/login").send(user);
      assert.equal(response.status, 400);
      assert.strictEqual(response.body.error, "missing username or password");
    });
  });
});

after(async () => {
  // Close the database connection
  await mongoose.connection.close();
});
