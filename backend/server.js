// Web server config
const PORT = 3004;
const express = require("express");
const app = express();
//const path = require('path');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://quotes-home.onrender.com"); // update to match the domain you will make the request from (Gets around CORS issues)
  //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json())

const indexRoute = require("./routes/index")


app.use("/", indexRoute);

app.get("/", (req, res) => {
res.error(404).send("Better luck next time!")
});

app.get("/test", (req, res) => {
  res.send("🤗");
});

app.listen(PORT, () => {
  console.log(`Quotes listening on port ${PORT} 😎`);
});
