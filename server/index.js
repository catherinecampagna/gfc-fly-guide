"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
const port = 8888;
const { createUser, getFlies, getFly, toggleFavorite, postReview, updateReview, deleteReview } = require("./handlers");
const bodyParser = require("body-parser"); 



express()
// Below are methods that are included in express(). We chain them for convenience.
// --------------------------------------------------------------------------------

// This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
.use(morgan("tiny"))
.use(express.json())
.use(express.static("public"))
.use(bodyParser.json())

// REST endpoints
.get("/flies", getFlies) // endpoint to get all flies
.get("/fly/:_id", getFly) // endpoint to get a specific fly by id
.get("/user/:id", getUser) // endpoint to get user info
.post("/user/:_id", createUser) // endpoint to create a user
.put("/user/:_id/favoriteFlies", toggleFavorite) // endpoint to add a fly to favorites
.post("/fly/:_id/reviews", postReview) // endpoint to post a new review for a fly
.put("/fly/:_id/reviews/:reviewId", updateReview) // endpoint to update an existing review for a fly
.delete("/fly/:_id/reviews/:reviewId", deleteReview) // endpoint to delete a review for a fly

// TEST endpoints
.get("/test", (req, res) => {
  res.status(200).json({ itWorked: true });
})
.get("*", (req, res) => {
  res.status(404).json({
    status: 404,
    message: "This is obviously not what you are looking for.",
  });
})


.listen(port, () => console.log(`Listening on port ${port}`));
