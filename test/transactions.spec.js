"use strict";

import { expect } from "chai";
import api from "./testapi.js";

describe("Transactions", () => {
  let TOKEN;
  let ACCOUNT_ID;
  let TEST_TRANSACTION;

  before(async () => {
    // reset databases
    await api.post("/reset/user");
    await api.post("/reset/account");
    await api.post("/reset/transaction");

    // create a test user
    const userData = {
      name: "tester",
      username: "tester",
      password: "tester",
    };

    await api.post("/user/register").send(userData);

    // login the test user to get token
    const userResponse = await api
      .post("/user/login")
      .send({ username: "tester", password: "tester" });
    TOKEN = userResponse.body.token;

    // create a test account for transactions
    const accountData = {
      name: "test account",
      balance: 100,
    };
    const accountResponse = await api
      .post("/account")
      .set("Authorization", `Bearer ${TOKEN}`)
      .send(accountData);
    ACCOUNT_ID = accountResponse.body.id;
  });

  it("can be recorded", async () => {
    const transactionData = {
      type: "income",
      amount: 50,
      accountId: ACCOUNT_ID,
    };
    const response = await api
      .post("/transaction")
      .set("Authorization", `Bearer ${TOKEN}`)
      .send(transactionData);
    expect(response.status).to.equal(201);
    expect(response.body.type).to.equal(transactionData.type);
    expect(response.body.amount).to.equal(transactionData.amount);

    TEST_TRANSACTION = response.body;
  });

  it("can be fetched", async () => {
    const response = await api
      .get("/transaction")
      .set("Authorization", `Bearer ${TOKEN}`);
    expect(response.status).to.equal(200);
    expect(response.body).to.be.an("array");
    expect(response.body).to.have.lengthOf(1);
    expect(response.body[0].type).to.equal(TEST_TRANSACTION.type);
    expect(response.body[0].amount).to.equal(TEST_TRANSACTION.amount);
  });

  it("can be updated", async () => {
    const transactionData = {
      type: "income",
      amount: 100,
    };
    const response = await api
      .put(`/transaction/${TEST_TRANSACTION.id}`)
      .set("Authorization", `Bearer ${TOKEN}`)
      .send(transactionData);
    expect(response.status).to.equal(201);
    expect(response.body.type).to.equal(transactionData.type);
    expect(response.body.amount).to.equal(transactionData.amount);
  });

  it("can be deleted", async () => {
    // api delete request for the TEST_TRANSACTION
    const response = await api
      .delete(`/transaction/${TEST_TRANSACTION.id}`)
      .set("Authorization", `Bearer ${TOKEN}`);

    // api should return 204
    expect(response.status).to.equal(204);

    // Delay for a short period to ensure the deletion is processed

    // make a get request using the id to make sure it has been deleted
    const getResponse = await api
      .get(`/transaction/${TEST_TRANSACTION.id}`)
      .set("Authorization", `Bearer ${TOKEN}`);

    // api should return 404
    expect(getResponse.status).to.equal(404);
  });

  describe("should not be able to be", () => {
    describe("created", () => {
      it("without type", async () => {
        const transactionData = {
          amount: 50,
          accountId: ACCOUNT_ID,
        };
        const response = await api
          .post("/transaction")
          .set("Authorization", `Bearer ${TOKEN}`)
          .send(transactionData);
        expect(response.status).to.equal(400);
      });

      it("without amount", async () => {
        const transactionData = {
          type: "income",
          accountId: ACCOUNT_ID,
        };
        const response = await api
          .post("/transaction")
          .set("Authorization", `Bearer ${TOKEN}`)
          .send(transactionData);
        expect(response.status).to.equal(400);
      });

      it("without accountId", async () => {
        const transactionData = {
          type: "income",
          amount: 50,
        };
        const response = await api
          .post("/transaction")
          .set("Authorization", `Bearer ${TOKEN}`)
          .send(transactionData);
        expect(response.status).to.equal(400);
      });

      it("if account not found", async () => {
        const transactionData = {
          type: "income",
          amount: 50,
          accountId: "000000000000000000000000",
        };

        const response = await api
          .post("/transaction")
          .set("Authorization", `Bearer ${TOKEN}`)
          .send(transactionData);
        expect(response.status).to.equal(404);
      });
    });

    describe("updated", () => {
      const transactionData = {
        type: "income",
        amount: 100,
      };

      it("if not authorized", async () => {
        const response = await api
          .put(`/transaction/${TEST_TRANSACTION.id}`)
          .send(transactionData);
        expect(response.status).to.equal(401);
      });

      it("if not found", async () => {});
    });

    describe("fetched", () => {
      it("if not authorized", async () => {
        const response = await api.get("/transaction");
        expect(response.status).to.equal(401);
      });

      it("if not found", async () => {
        const response = await api
          .get("/transaction/66bb79acd4a0772ddca1625e")
          .set("Authorization", `Bearer ${TOKEN}`);
        expect(response.status).to.equal(404);
      });
    });

    describe("deleted", () => {
      it("if not authorized", async () => {
        const response = await api.delete(
          `/transaction/${TEST_TRANSACTION.id}`
        );
        expect(response.status).to.equal(401);
      });

      it("if not found", async () => {
        const response = await api
          .delete("/transaction/66bb79acd4a0772ddca1625e")
          .set("Authorization", `Bearer ${TOKEN}`);
        expect(response.status).to.equal(404);
      });
    });
  });
});
