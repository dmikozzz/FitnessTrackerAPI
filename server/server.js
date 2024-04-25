// Import Express to create a web server and Mongoose to interact with the MongoDB database.
import express from "express"
import mongoose from "mongoose"
import apiRegister from "./api-register.js"
import { rateLimit } from 'express-rate-limit'

// Creates an instance of Express-app, this is our web server.
const server = express()

// Decides which port the server will listen on
const port = 3000

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 300, // Limit each IP to 300 requests per `window` (here, per 15 minutes).
  standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
})

// Apply the rate limiting middleware to all requests.
server.use(limiter)
/*
  The server uses a middleware (express.json() ) to convert our request to JSON.
  This allows us to handle the JSON data sent in the request body.
*/
server.use(express.json())

/* 
  Our MongoDB Atlas connection-string
  Connects to the MongoDB database with the help of Mongoose. 
  The string contains: 
    Username - <Username>
    Password - <Password>
    Database name (Optional) - <DB-Name>
*/
mongoose.connect("mongodb+srv://duricmitar:12345kyh@cluster0.u0p0rie.mongodb.net/")


apiRegister(server, mongoose)


/* 
  Starts the server to listen on the defined port.
  When the server has started a message is logged in the console.
*/
server.listen(port, () => console.log(`Listening on port http://localhost:${port}`))