"use strict";

import { expect } from "chai";
import api from "./testapi.js";

describe("users", () => {
  before(async () => {
    await api.post("/reset/user");
  });

  const userData = {
    name: "tester",
    username: "tester",
    password: "tester",
  };

  it("should be able to create a new account", async () => {
    const response = await api.post("/user/register").send(userData);
    expect(response.status).to.equal(201);
    expect(response.body).to.have.property("name").to.equal(userData.name);
    expect(response.body)
      .to.have.property("username")
      .to.equal(userData.username);
  });

  describe("should not be able to create a new account", () => {
    it("with an existing username", async () => {
      const response = await api.post("/user/register").send(userData);
      expect(response.status).to.equal(400);
      expect(response.body.error.message).to.include("username already taken");
    });

    it("without username", async () => {
      const userWithoutUsername = {
        ...userData,
        username: undefined,
      };

      const response = await api
        .post("/user/register")
        .send(userWithoutUsername);
      expect(response.status).to.equal(400);
    });

    it("without password", async () => {
      const userWithoutPassword = {
        ...userData,
        password: undefined,
      };

      const response = await api
        .post("/user/register")
        .send(userWithoutPassword);
      expect(response.status).to.equal(400);
    });
  });

  it("should be able to login with valid credentials", async () => {
    const response = await api.post("/user/login").send(userData);
    expect(response.status).to.equal(200);
    expect(response.body.name).to.equal(userData.name);
    expect(response.body.username).to.equal(userData.username);
    expect(response.body).to.have.property("token");
  });

  describe("should not be able to login", () => {
    it("with invalid credentials", async () => {
      const invalidLoginData = {
        ...userData,
        password: "wrongPassword",
      };
      const response = await api.post("/user/login").send(invalidLoginData);
      expect(response.status).to.equal(401);
    });
    it("without username", async () => {
      const loginDataWithoutUsername = {
        ...userData,
        username: undefined,
      };
      const response = await api
        .post("/user/login")
        .send(loginDataWithoutUsername);
      expect(response.status).to.equal(400);
    });
    it("without password", async () => {
      const loginDataWithoutPassword = {
        ...userData,
        password: undefined,
      };
      const response = await api
        .post("/user/login")
        .send(loginDataWithoutPassword);
      expect(response.status).to.equal(400);
    });
  });
});
