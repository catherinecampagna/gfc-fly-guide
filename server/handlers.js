"use strict";
require("dotenv").config();
const { MONGO_URI } = process.env;
const { MongoClient } = require("mongodb");
const { v4: uuidv4 } = require('uuid');

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

// ** Get a user's info **
const getUser = async (req, res) => {
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

// ** Get a user's favorite flies **
const getUserFavorites = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("FlyGuide");
    const email = req.params._id;
    const user = await db
      .collection("Users")
      .findOne({ email }, { favoriteFlies: 1 });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user.favoriteFlies);
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

// ** Add/ remove fly to/ from favorites **
const updateFavorites = async (req, res) => {
  const userId = req.params._id;
  const flyId = Number(req.body.flyId);
  const client = new MongoClient(MONGO_URI, options);
  try {
    await client.connect();
    const db = client.db("FlyGuide");
    let message;
    let result;
    // Adding the fly id to the user's favorite flies array using $addToSet to avoid duplicates
    const user = await db.collection("Users").findOne({ _id: userId });

    if (user.favoriteFlies.includes(flyId)) {
      // is already in array remove it
      result = await db
        .collection("Users")
        .updateOne({ _id: userId }, { $pull: { favoriteFlies: flyId } });
        message = "Fly removed from favorites"
    } else {
      result = await db
        .collection("Users")
        .updateOne({ _id: userId }, { $addToSet: { favoriteFlies: flyId } });
        message = "Fly added to favorites"

    }
    // If the modifiedCount property of the result object is truthy, return a success response
    // Otherwise, return a failure response
    result.modifiedCount
      ? res.status(200).json({ status: 200, message: message })
      : res
          .status(400)
          .json({ status: 400, message: "Failed update favorites" });
  } catch (error) {
    res.status(500).json({ status: 500, message: error });
  } finally {
    client.close();
  }
};

// ** Add a review **
const postReview = async (req, res) => {
  console.log("postReview function called with request body:", req.body);

  // Extract the fly ID, review text, and author from the request
  const { _id } = req.params;
  const { reviewText, author } = req.body;
  // Create a new Date object for the current date and time
  const currentDate = new Date();

  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();
    const db = client.db("FlyGuide");
    const reviewId = uuidv4();
    const newReview = {
      _id: reviewId,
      flyId: _id,
      reviewText,
      author,
      date: currentDate,
    }
    // Insert a new review document into the Reviews collection
    const result = await db.collection("Reviews").insertOne(newReview);

    // Update the Fly document in the Flies collection to add the new review ID
    const flyResult = await db
      .collection("Flies")
      .updateOne(
        { _id: Number(_id) },
        { $push: { reviews: reviewId } }
      );
    console.log("fly updated: ", flyResult);

    // Update the User document in the Users collection to add the new review ID
    const userResult = await db
      .collection("Users")
      .updateOne( 
        { _id: author },
        { $push: { reviews: reviewId } }
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

// ** Get all reviews **
const getAllReviews = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db('FlyGuide');
    const reviews = await db.collection('Reviews').find().toArray();
    res.status(200).json({ success: true, data: reviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Server error' });
  } finally {
    await client.close();
  }
};

// ** Get all reviews by fly id **
const getReviews = async (req, res) => {
  const { _id } = req.params;
  console.log(`Fetching reviews for fly with ID ${_id}`);


  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("FlyGuide");
    const reviewsCollection = db.collection("Reviews");
    const reviews = await reviewsCollection.find({ flyId: String(_id) }).toArray();
    console.log(`Found ${reviews.length} reviews for fly with ID ${_id}:`);
    console.log(reviews);
    res.status(200).json({ data: { reviews } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error." });
  } finally {
    client.close();
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
  getAllReviews,
  getUserFavorites,
  getUserReviews,
  getReviews,
  createUser,
  updateFavorites,
  postReview,
  updateReview,
  deleteReview,
};
