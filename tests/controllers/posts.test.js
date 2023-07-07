const request = require("supertest");
const { expect } = require("chai");
const server = require("../../server");

describe("Posts", () => {
  let api;
  before("Setting the tests in before block", (done) => {
    server.then((app) => {
      api = request(app);
    })
      .then(() => done())
      .catch(done);
  });

  it("returns all airports, limited to 30 per page", (done) => {
    api.get("/posts")
      .then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("message", "Posts fetched successfully.");
        expect(response.body).to.have.property("data");
        expect(response.body.data).to.have.length(0);
        done();
      })
      .catch(done);

    // expect(response.status).to.eql(200);
    // expect(response.body.data.length).to.eql(30);
  });
});
