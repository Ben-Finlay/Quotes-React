// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("../lib/db.js");
const db = new Pool(dbParams);

db.connect(() => {
  console.log("Successfully connected to database 🤗");
});

module.exports = db;
