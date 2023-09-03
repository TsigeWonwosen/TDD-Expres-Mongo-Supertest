const { expect } = require("chai");

const { getUsersByName } = require("./db.js");

describe("getUsersByName ", () => {
  it("return correct users from the Data base based on user name ", async () => {
    try {
      const users = await getUsersByName("Hoyam");

      expect(users.name).to.equal("Hoyam");
      expect(users.age).to.equal(24);
    } catch (e) {
      console.log("Error Readying user : " + e.message);
    }
  });
});
