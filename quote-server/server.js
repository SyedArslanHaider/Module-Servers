// server.js
// This is where your node app starts

//load the 'express' module which makes writing webservers easy
import express, { request } from "express";
import cors from "cors";
//load the quotes JSON
import quotes from "./quotes.json" assert { type: "json" };

const app = express();
app.use(cors()); // Allow all origins
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Allow requests from any origin
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// Now register handlers for some routes:
//   /                  - Return some helpful welcome info (text)
//   /quotes            - Should return all quotes (json)
//   /quotes/random     - Should return ONE quote (json)
app.get("/", (request, response) => {
  response.send("Neill's Quote Server!  Ask me for /quotes/random, or /quotes");
});

//START OF YOUR CODE...
app.get("/quotes", (request, response) => {
  response.json(quotes);
});
app.get("/quotes/random", (request, response) => {
  response.json(pickFromArray(quotes));
});
//...END OF YOUR CODE

//You can use this function to pick one element at random from a given array
//example: pickFromArray([1,2,3,4]), or
//example: pickFromArray(myContactsArray)
//
const pickFromArray = (arrayofQuotes) =>
  arrayofQuotes[Math.floor(Math.random() * arrayofQuotes.length)];

//Start our server so that it listens for HTTP requests!
const listener = app.listen(3001, () => {
  console.log("Your app is listening on port " + listener.address().port);
});

app.get("/quotes/search", (request, response) => {
  const term = request.query.term?.toLowerCase();
  if (!term) {
    return response.json([]);
  }
  const filterQ = quotes.filter(q=>
    q.quote?.toLowerCase().includes(term) || q.author?.toLowerCase().includes(term)
  );
  response.json(filterQ);
});