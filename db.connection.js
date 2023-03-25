const mongoose = require("mongoose");

const connection = () =>
  mongoose
    .connect(process.env.DB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((err) => {
      console.error("Mongoose Error" + err);
    });

module.exports = connection;
