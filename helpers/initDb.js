const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: process.env.DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Mongodb is CONNECTED");
  })
  .catch((err) => {
    console.log("NOT CONNECTED TO Mongodb, error :", err.message);
  });

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to db");
});

mongoose.connection.on("error", (err) => {
  console.log("Mongoose not connected, error :", err.message);
});

mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected to db");
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});
