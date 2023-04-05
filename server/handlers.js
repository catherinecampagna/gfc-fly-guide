"use strict";
require("dotenv").config();
const { MONGO_URI } = process.env;
const { MongoClient } = require("mongodb");

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

// ** Create a new user **
const createUser = async (req, res) => {
  // gets email and name from the request body
  const { email, name } = req.body;
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("FlyGuide");
    // check if the user already exists
    const existingUser = await db.collection("Users").findOne({ email });
    if (existingUser) {
      res.status(200).json({ message: "User already exists" });
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

// ** Get a user's favorite flies **
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
    await client.close();
  }
};

// ** Get a user's reviews **
const getUserReviews = async (req, res) => {
  const { email } = req.params;
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("FlyGuide");
    const user = await db.collection("Users").findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const reviews = user.reviews;
    return res.status(200).json({ reviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  } finally {
    await client.close();
  }
};

// ** Get all flies **
const getFlies = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    const db = client.db("FlyGuide");

    const flies = await db.collection("Flies").find().toArray();
    return res.status(200).json({ status: 200, data: flies });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: 500, message: "Internal server error" });
  }
};

// ** Get fly by _id **
const getFly = async (req, res) => {
  const flyId = req.params._id;
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("FlyGuide");
    const fly = await db.collection("Flies").findOne({ _id: Number(flyId) });
    if (fly) {
      res.status(200).json({ data: fly });
    } else {
      res.status(404).json({ message: "Fly not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  } finally {
    client.close();
  }
};

// ** Add fly to favorite **
const addFavorite = async (req, res) => {
  const userId = req.params._id;
  const { flyId } = req.body;
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("FlyGuide");
    // Adding the fly id to the user's favorite flies array using $addToSet to avoid duplicates
    const result = await db
      .collection("Users")
      .updateOne({ _id: userId }, { $addToSet: { favoriteFlies: flyId } });
    // If the modifiedCount property of the result object is truthy, return a success response
    // Otherwise, return a failure response
    result.modifiedCount
      ? res.status(200).json({ status: 200, message: "Fly added to favorites" })
      : res
          .status(400)
          .json({ status: 400, message: "Failed to add fly to favorites" });
  } catch (error) {
    res.status(500).json({ status: 500, message: error });
  } finally {
    client.close();
  }
};

// ** Remove fly to favorite **
const removeFavorite = async (req, res) => {
  const userId = req.params._id;
  const { flyId } = req.body;
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("FlyGuide");
    // Remove the fly from the user's favorites list
    const result = await db
      .collection("Users")
      .updateOne({ _id: userId }, { $pull: { favoriteFlies: flyId } });
    // Return a success or error response
    result.modifiedCount
      ? res
          .status(200)
          .json({ status: 200, message: "Fly removed from favorites" })
      : res.status(400).json({
          status: 400,
          message: "Failed to remove fly from favorites",
        });
  } catch (error) {
    res.status(500).json({ status: 500, message: error });
  } finally {
    client.close();
  }
};
// ** Add a review **
const postReview = async (req, res) => {
  // Extract the fly ID, review text, and author from the request
  const { _id } = req.params;
  const { reviewText, author } = req.body;
  // Create a new Date object for the current date and time
  const currentDate = new Date();

  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();

    const db = client.db("FlyGuide");
    // Insert a new review document into the Reviews collection
    const result = await db.collection("Reviews").insertOne({
      flyId: _id,
      reviewText,
      author,
      date: currentDate,
    });

    console.log("inserting new review: ", result.ops[0]);

    // Update the Fly document in the Flies collection to add the new review ID
    const flyResult = await db
      .collection("Flies")
      .updateOne(
        { _id: Number(_id) },
        { $push: { reviews: result.ops[0]._id } }
      );
    console.log("fly updated: ", flyResult);

    // Update the User document in the Users collection to add the new review ID
    const userResult = await db
      .collection("Users")
      .updateOne(
        { email: author.email },
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

// ** Get all reviews by fly id **
const getReviews = async (req, res) => {
  try {
    // Connect to the MongoDB database
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    const db = client.db("FlyGuide");

    // Find the fly by _id
    const flyId = req.params._id;
    const fly = await db.collection("Flies").findOne({ _id: Number(flyId) });

    // If the fly does not exist, return a 404 error
    if (!fly) {
      return res.status(404).json({ message: "Fly not found" });
    }

    // Get the reviews for the fly
    const reviews = await db
      .collection("Reviews")
      .find({ flyId: Number(flyId) })
      .toArray();

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
  getUserFavorites,
  getUserReviews,
  getReviews,
  createUser,
  addFavorite,
  removeFavorite,
  postReview,
  updateReview,
  deleteReview,
};
