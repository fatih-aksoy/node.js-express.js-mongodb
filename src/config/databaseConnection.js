const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database is connected successfully!");
  })
  .catch((err) => {
    console.log("Database connection failed: " + err);
  });
