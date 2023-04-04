"use strict";
require("dotenv").config();
const { MONGO_URI } = process.env;
const { MongoClient } = require("mongodb");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// Create a new user
const createUser = async (req, res) => {
  const { email, name } = req.body;
  // connect to MongoDB 
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("FlyGuide");
    // check if the user already exists
    const existingUser = await db.collection("Users").findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
    } else {
      // create a new user document and insert it into the Users collection
      const newUser = { _id: email, email, name, favoriteFlies: [], reviews: [], ratings: []  };
      const result = await db.collection("Users").insertOne(newUser);
      res.status(200).json({ message: "User created successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
    client.close();
  }
  client.close();
}

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
          .json({
            status: 400,
            data: flyId,
            message: "Nothing was found here",
          });
  } catch (error) {
    res.status(500).json({ status: 500, message: error });
    client.close();
  }
  client.close();
};


// Toggle fly in favourites
const toggleFavorite = async (req, res) => {
  console.log(req.body);

  const userId = req.params._id;
  const { flyId } = req.body;
  // connect to MongoDB 
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("FlyGuide");
    // add the fly to the user's favourites list
    const result = await db.collection("Users").updateOne(
      { _id: userId },
      { $push: { favoriteFlies: flyId } }
    );
    // return a success or error response
    result.modifiedCount
      ? res.status(200).json({ status: 200, message: "Fly added to favourites" })
      : res.status(400).json({ status: 400, message: "Failed to add fly to favourites" });
  } catch (error) {
    res.status(500).json({ status: 500, message: error });
  } finally {
    client.close();
  }
};

// Post a review
const postReview = async (req, res) => {
  const { userId, flyId, rating, comment } = req.body;
  // connect to MongoDB and add the review to the fly's reviews list
  // return a success or error response
};

// Edit a review
const updateReview = async (req, res) => {
  const { userId, flyId, rating, comment } = req.body;
  const reviewId = req.params.reviewId;
  // connect to MongoDB and update the review with the given reviewId
  // return a success or error response
};

// Delete a review
const deleteReview = async (req, res) => {
  const { userId, flyId } = req.body;
  const reviewId = req.params.reviewId;
  // connect to MongoDB and remove the review with the given reviewId
  // return a success or error response
};

module.exports = {
  createUser,
  getFlies,
  getFly,
  toggleFavorite,
  postReview,
  updateReview,
  deleteReview,
};
