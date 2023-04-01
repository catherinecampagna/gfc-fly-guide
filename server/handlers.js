"use strict";
require("dotenv").config();
const { MONGO_URI } = process.env;
const { MongoClient } = require("mongodb");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//Get all flies
const getFlies = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("FlyGuide");

    const flies = await db.collection("Flies").find().toArray();
    flies
      ? res.status(200).json({ status: 200, data: flies })
      : res
          .status(400)
          .sjon({ status: 400, message: "Nothing was found here" });
  } catch (error) {
    res.status(500).json({ status: 500, message: error });
    client.close();
  }
  client.close();
};

//Get fly by _id
const getFly = async (req, res) => {
  const flyId = req.params._id;
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("FlyGuide");
    const flyById = await db
      .collection("Flies")
      .findOne({ _id: Number(flyId) });

      flyById
      ? res.status(200).json({ status: 200, data: flyById })
      : res
          .status(400)
          .json({ status: 400, data: flyId, message: "Nothing was found here" });
  } catch (error) {
    res.status(500).json({ status: 500, message: error });
    client.close();
  }
  client.close();
}

module.exports = {getFlies, getFly}