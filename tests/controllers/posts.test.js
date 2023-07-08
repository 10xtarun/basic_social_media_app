const request = require("supertest");
const { expect } = require("chai");
const server = require("../../server");
const Post = require("../../models/posts");

let api;

describe("Post APIs", () => {
  before("initialize API in before block", (done) => {
    server
      .then((app) => {
        api = request(app);
      })
      .then(() => done())
      .catch(done);
  });

  before("create posts in before block", (done) => {
    const dummyData = [
      {
        caption: "My first post.",
        image_url: "test.com",
        user_id: "user_1",
      },
      {
        caption: "My second post.",
        image_url: "test.com",
        user_id: "user_2",
      },
    ];

    Post.insertMany(dummyData)
      .then(() => done())
      .catch(done);
  });

  after("purge dummy data in after block", (done) => {
    Post.deleteMany({})
      .then(() => done())
      .catch(done);
  });

  it("get all posts", (done) => {
    api.get("/posts")
      .then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("message", "Posts fetched successfully.");
        expect(response.body).to.have.property("data");
        expect(response.body.data).to.be.an("array");
        expect(response.body.data).to.have.length(2);
        expect(response.body.data[0]).to.have.property("_id");
        expect(response.body.data[0]).to.have.property("uid");
        expect(response.body.data[0]).to.have.property("caption", "My first post.");
        expect(response.body.data[0]).to.have.property("image_url", "test.com");
        expect(response.body.data[0]).to.have.property("user_id", "user_1");

        expect(response.body.data[1]).to.have.property("_id");
        expect(response.body.data[1]).to.have.property("uid");
        expect(response.body.data[1]).to.have.property("caption", "My second post.");
        expect(response.body.data[1]).to.have.property("image_url", "test.com");
        expect(response.body.data[1]).to.have.property("user_id", "user_2");

        done();
      })
      .catch(done);
  });

  it("should throw error if file is not sent", (done) => {
    api.post("/posts")
      // .attach("file", "tests/resources/sample_image.jpeg")
      .field("caption", "My third post.")
      .field("user_id", "user_3")
      .then((response) => {
        expect(response.status).to.equal(400);
        expect(response.body).to.have.property("message", "Post creation failed.");
        expect(response.body).to.have.property("error", "TypeError: Cannot read properties of undefined (reading 'originalname')");
      })
      .then(() => done())
      .catch(done);
  });

  it("create a post", (done) => {
    api.post("/posts")
      .attach("file", "tests/resources/sample_image.jpeg")
      .field("caption", "My third post.")
      .field("user_id", "user_3")
      .then((response) => {
        expect(response.status).to.equal(201);
        expect(response.body).to.have.property("data");
        expect(response.body.data).to.have.property("image_url");
        expect(response.body.data.image_url).to.be.an("string");
        expect(response.body.data.user_id).to.equal("user_3");
        expect(response.body.data.caption).to.equal("My third post.");
      })
      .then(() => done())
      .catch(done);
  });
});
