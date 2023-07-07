const express = require("express");
const dotenv = require("dotenv");
const routes = require("./routes");
const connectToDatabase = require("./configs/db");
const errorHandler = require("./middlewares/errorHandler");

dotenv.config({
  path: `.${process.env.NODE_ENV}.env`,
});

// initialize express app
const app = express();

module.exports = Promise.resolve()
  .then(() => {
    // connect to the database
    connectToDatabase();
  })
  .then(() => {
    // add middlewares
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
  })
  .then(() => {
    // test/greetings API at root level
    app.get("/", (req, res) => {
      res.send("Greetings from your social media app server.");
    });

    // include other Routes
    app.use("/posts", routes.postRouter);
    app.use("/users", routes.userRouter);

    app.use(errorHandler);
  })
  .then(() => {
    // server's port
    app.listen(8000, (error) => {
      if (error) {
        // if server is not starting then log the error
        // eslint-disable-next-line no-console
        console.log("Server unable to start: ", error);
      }
      // eslint-disable-next-line no-console
      console.log("Server is running on port 8000.");
    });

    return app;
  });
