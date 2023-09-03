const request = require("supertest");

const { expect } = require("chai");
const app = require("./server.js"); // Your Express app instance

describe("GET /", () => {
  it("should return a list of users", async () => {
    const response = await request(app).get("/");
    expect(response.status).to.equal(200);
    // expect(response.body).to.have.length(2); // Assuming 3 users are returned
  });

  it("POST /send", async () => {
    const newUser = {
      name: "Abera",
      age: 24,
      email: "abera@gmail.com",
      address: "Ethiopia , Dire Dewa",
    };
    const response = await request(app).post("/send").expect("Content-Type", /json/).send(newUser);

    console.log(response.body.data);

    // expect(response.status).to.equal(201);
    // expect(response.body.data).to.have.length(3);
    // expect(response.body.data[2]).to.deep.include(newUser);
    // expect(response.body.data[1].email).to.equal("chuchu@gmail.com");
    // expect(response.body.data[0].email).to.equal("wonde@test.com");
  });

  it("GET  a single user by name - /user/abel", async () => {
    const response = await request(app).get("/users/Abel");

    console.log(response.body.data);

    expect(response.status).to.equal(200);
    expect(response.body.data.name).to.equal("Abel");
  });

  it("PUT  - Update user email by name - /user/abel", async () => {
    const response = await request(app).put("/users/Abel").expect("Content-Type", /json/).send({ email: "abelshi@gmail.com" });

    console.log(response.body.data);

    expect(response.status).to.equal(200);
    expect(response.body.data.email).to.equal("abelshi@gmail.com");
  });

  it("DELETE - return the deleted user by Id", async () => {
    const userDeleted = await request(app).delete("/users/64f4a65e47f8a0497f72bb13").expect("Content-Type", /json/);

    console.log("Deleted user: " + userDeleted.data);
    expect(userDeleted.status).to.equal(200);
  });
});
