const mongoose = require("mongoose");

module.exports = () => {
  mongoose.connect(process.env.MONGO_URI)
    .then((client) => {
      const { db } = client.connection;
      // eslint-disable-next-line no-console
      console.log("Database connection established and connected to db: ", db.databaseName);
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log("Database connection failed due to error: ", error);
      process.exit(0);
    });
};
