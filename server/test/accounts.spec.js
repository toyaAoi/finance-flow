"use strict";

import { expect } from "chai";
import api from "./testapi.js";

describe("an account", () => {
  let TOKEN;
  // let SECOND_USER;
  // let TEST_ACCOUNT;

  before(async () => {
    await api.post("/reset/user");
    await api.post("/reset/account");

    const userData = {
      name: "tester",
      username: "tester",
      password: "tester",
    };

    await api.post("/user/register").send(userData);

    const response = await api.post("/user/login").send(userData);
    TOKEN = response.body.token;
  });

  it("can be created", async () => {
    const accountData = {
      name: "test account",
      balance: 100,
    };
    const response = await api
      .post("/account")
      .set("Authorization", `Bearer ${TOKEN}`)
      .send(accountData);
    expect(response.status).to.equal(201);
    expect(response.body.name).to.equal(accountData.name);
    expect(response.body.balance).to.equal(accountData.balance);

    // TEST_ACCOUNT = response.body;
  });

  // TODO: add tests for adding and removing users
  // it("owner can add another user to it", async () => {
  //   const user2Data = {
  //     name: "tester2",
  //     username: "tester2",
  //     password: "tester2",
  //   };

  //   const secondUser = await api.post("/user/register").send(user2Data);
  //   SECOND_USER = secondUser.body;
  //   await api
  //     .post("/account/user")
  //     .set("Authorization", `Bearer ${TOKEN}`)
  //     .send({
  //       userId: SECOND_USER.id,
  //     });

  //   const response = await api
  //     .post(`/account/${TEST_ACCOUNT.id}/user`)
  //     .set("Authorization", `Bearer ${TOKEN}`)
  //     .send({
  //       userId: SECOND_USER.id,
  //     });

  //   expect(response.status).to.equal(201);
  //   expect(response.body).to.have.property("message");
  //   expect(response.body.message).to.equal("User added to account");
  // });

  // it("owner can remove an user from it", async () => {
  //   const response = await api
  //     .delete(`/account/${TEST_ACCOUNT.id}/user/${SECOND_USER.id}`)
  //     .set("Authorization", `Bearer ${TOKEN}`);

  //   expect(response.status).to.equal(204);
  // });
});
