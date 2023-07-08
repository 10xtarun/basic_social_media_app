const { expect } = require("chai");

const greetings = (flag = false) => {
  if (flag) {
    return {
      message: "Hello World!",
      success: true,
    };
  }
  return {
    message: "Dumb World!",
    success: false,
  };
};

describe("Sample Test Cases", () => {
  it("should return success", () => {
    const result = greetings(true);
    expect(result).to.be.an("object");
    expect(result).to.have.property("message");
    expect(result).to.have.property("success");
    expect(result.message).to.equal("Hello World!");
    expect(result.success).to.equal(true);
  });

  it("should return success = false", () => {
    const result = greetings();
    expect(result).to.be.an("object");
    expect(result).to.have.property("message");
    expect(result).to.have.property("success");
    expect(result.message).to.equal("Dumb World!");
    expect(result.success).to.equal(false);
  });
});
