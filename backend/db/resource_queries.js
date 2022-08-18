const db = require('./db_connect');

/**
 *
 * @returns array of all resource objects
 */

const getAllQuotes = () => {
  const queryString = `SELECT * FROM quotes;`;
  return db
  .query(queryString)
  .then((quotes) => {
    console.log("Successfully getting all quotes");
    return quotes.rows;
  })
  .catch((err) => {
    console.log("error while executing getAllQuotes: ", err);
  })
}

/**
 * Fetches a single resource object that has resources.id = query params.
 * @param {INTEGER} quoteId
 * @returns a promise with a resource object (NOT AN ARRAY!) that matches the resource id
 */
const getQuoteById = (quoteId) => {
  const queryString = `SELECT * FROM quotes WHERE id = $1;`;
  const queryValue = [quoteId];

  return db
  .query(queryString, queryValue)
  .then((quotes) => {
    return quotes.rows[0];
  })
  .catch((err) => {
    console.log("error while executing getMyResources fxn: ", err);
  })
};

/**
 * Adds a new resource to the DB
 * @param {{}} resourceData An object containing all of the resource details
 * @returns {promise<{}>} a promise with the newly created resource object
 */
// const addResource = (resourceData) => {
//  //? Check with front end to make sure data input order from req.body is matching
//   const queryString = `INSERT INTO resources (title, description, tag, url, creator_id) VALUES ($1, $2, $3, $4, $5) RETURNING *;`;
//   const queryValue = Object.values(resourceData);

//   return db
//   .query(queryString, queryValue)
//   .then((resources) => {
//     console.log("new resource added: ", resources.rows);
//     return resources.rows[0];
//   })
//   .catch((err) => {
//     console.log("error while executing getMyResources fxn: ", err);
//   })
// };



module.exports = {
  //list all the functions here
  getAllQuotes,

  getQuoteById

}
