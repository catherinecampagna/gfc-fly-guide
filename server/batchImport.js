const { MongoClient } = require("mongodb");
const reviews = require("./data/reviews.json");

require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const batchImport = async () => {
  console.log("Starting batchImport...");
  const client = new MongoClient(MONGO_URI, options);
  await client.connect();
  console.log("Client connected.");

  // Connect to the database
  const dbName = "FlyGuide";
  const db = client.db(dbName);
  console.log("connected!");

  await db.collection("Reviews").insertMany(reviews);
  client.close();
      console.log("disconnected!");

};

batchImport();
