const { expect } = require("chai");

const { getUsersByName, getUsersByEmail, resetModel } = require("./db.js");

describe("getUsersByName ", () => {
  afterEach("Run After every Test.", () => {
    console.log("  >>>>> ");
  });
  it("return correct users from the Data base based on user name ", async () => {
    try {
      const actual = await getUsersByName("Hoyam");
      const expected = {
        name: "Hoyam",
        age: 24,
        address: "Morocco , M.m",
        email: "hoyam@gmail.com",
        __v: 0,
      };
      expect(actual._doc).excludingEvery("_id").to.deep.equal(expected);
      expect(actual.age).to.equal(24);
    } catch (e) {
      console.log("Error Readying user: " + e.message);
    }
  });

  it("return correct users from the Data base based on email ", async () => {
    try {
      const actual = await getUsersByEmail("abelshi@gmail.com");
      const expected = {
        name: "Abel",
        age: 30,
        address: "Italy,turin",
        email: "abelshi@gmail.com",
      };
      console.log(actual);
      expect(actual._doc).excludingEvery("_id").to.deep.equal(expected);
    } catch (e) {
      console.log("Error Readying user : " + e.message);
    }
  });

  it("return null when the user is not found. ", async () => {
    try {
      const actual = await getUsersByEmail("abel@gmail.com");
      const expected = null;
      console.log(actual);
      expect(actual).to.deep.equal(expected);
    } catch (e) {
      console.log("Error Readying user : " + e.message);
    }
  });
});
