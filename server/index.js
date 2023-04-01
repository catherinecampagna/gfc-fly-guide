"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
const port = 8888;
const { getFlies, getFly } = require("./handlers");
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
.get("/flies", getFlies)
.get("/fly/:_id", getFly)

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
