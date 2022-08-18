/*
 * All routes for Widgets are defined here
 * Since this file is loaded in server.js into /resources,
 *   these routes are mounted onto /widgets
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const resourceQueries = require('../db/resource_queries');


router.get("/", (req, res) => {
    resourceQueries.getAllQuotes()
    .then(response => {
      res.status(200).send(response)
    });
  }
)

module.exports = router;
