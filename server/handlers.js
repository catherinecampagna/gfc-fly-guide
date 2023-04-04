"use strict";
require("dotenv").config();
const { MONGO_URI } = process.env;
const { MongoClient } = require("mongodb");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const { ObjectId } = require("mongodb");

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
      const newUser = {
        _id: email,
        email,
        name,
        favoriteFlies: [],
        reviews: [],
        ratings: [],
      };
      const result = await db.collection("Users").insertOne(newUser);
      res.status(200).json({ message: "User created successfully" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
    client.close();
  }
  client.close();
};

// Get user info
const getUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  // connect to MongoDB
  try {
    await client.connect();
    const db = client.db("FlyGuide");
    const userId = req.params.userId;
    const user = await db
      .collection("Users")
      .findOne({ _id: ObjectId(userId) });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  } finally {
    client.close();
  }
};

//Get a user's favorite flies
const getUserFavorites = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("FlyGuide");
    const email = req.params._id;
    const user = await db.collection("Users").findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  } finally {
    client.close();
  }
};

// Get user's reviews
const getUserReviews = async (req, res) => {
  const { email } = req.params;

  try {
    const client = await MongoClient.connect(MONGO_URI, options);
    const db = client.db("FlyGuide");

    const user = await db.collection("Users").findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const reviews = user.reviews;
    return res.status(200).json({ reviews });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
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
      : res.status(400).json({
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
    const result = await db
      .collection("Users")
      .updateOne({ _id: userId }, { $push: { favoriteFlies: flyId } });
    // return a success or error response
    result.modifiedCount
      ? res
          .status(200)
          .json({ status: 200, message: "Fly added to favourites" })
      : res
          .status(400)
          .json({ status: 400, message: "Failed to add fly to favourites" });
  } catch (error) {
    res.status(500).json({ status: 500, message: error });
  } finally {
    client.close();
  }
};

// Post a review
const postReview = async (req, res) => {
  console.log("postReview called with request body: ", req.body);

  const { _id } = req.params;
  const { reviewText } = req.body;
  const currentDate = new Date();

  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();

    const db = client.db("FlyGuide");

    const result = await db.collection("Reviews").insertOne({
      flyId: _id,
      reviewText,
      author: user,
      date: currentDate,
    });

    console.log("inserting new review: ", result.ops[0]);

    // Update Flies collection
    const flyResult = await db.collection("Flies").updateOne(
      { _id: ObjectId(_id) },
      { $push: { reviews: result.ops[0]._id } }
    );
    console.log("fly updated: ", flyResult);

    // Update Users collection
    const userResult = await db.collection("Users").updateOne(
      { email: user.email },
      { $push: { reviews: result.ops[0]._id } }
    );
    console.log("user updated: ", userResult);

    res.status(201).json({ message: "Review posted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  } finally {
    client.close();
  }
};


// get all reviews by fly id
const getReviews = async (req, res) => {
  try {
    // Connect to the MongoDB database
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("FlyGuide");

    // Find the fly by _id
    const flyId = req.params._id;
    const fly = await db.collection("Flies").findOne({ _id: ObjectId(flyId) });

    // If the fly does not exist, return a 404 error
    if (!fly) {
      return res.status(404).json({ message: "Fly not found" });
    }

    // Get the reviews for the fly
    const reviews = await db
      .collection("Reviews")
      .find({ flyId: ObjectId(flyId) })
      .toArray();

    // Close the connection to the database
    client.close();

    // Return the reviews for the fly
    res.status(200).json(reviews);
  } catch (error) {
    // If there was an error, return a 500 error
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
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
  getFlies,
  getFly,
  getUser,
  getUserFavorites,
  getUserReviews,
  getReviews,
  createUser,
  toggleFavorite,
  postReview,
  updateReview,
  deleteReview,
};
