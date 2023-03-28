"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
const { stock, customers } = require("./data/inventory");
const port = 8888;


const app = express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  app.use(morgan("tiny"))
  app..use(express.json())

  app..get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })


  // Node spins up our server and sets it to listen on port 8000.
  .listen(8000, () => console.log(`Listening on port 8000`));