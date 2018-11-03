/*
 * Twutter RESTful API simulation
 *
 * Your job is to implement the endpoints found below and add more features
 * to Twutter's backend services.  Use documentation for MongoDB queries to
 * add more complex features to your endpoints.
 */

// Express
const express = require('express');
const app = express();
const router = express.Router();
const port = 300

/* Cors (Don't worry about this, it has to do sending resources
 * across domains on the internet, but read the Wiki page if you're
 * interested https://en.wikipedia.org/wiki/Cross-origin_resource_sharing) 
 */
var cors = require('cors');
app.use(cors());

// Body Parser (reading the body of HTTP requests)
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// MongoDB
var db;

const MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb://localhost:27017/twitter-simulation', { useNewUrlParser: true }, (err, database) => {
  if (err) return console.log(err);
  console.log('MongoDB server up and running');
  db = database.db('twitter-simulation');
  db.createCollection('users', (err, client) => {
    if (err) return console.log(err);
    console.log('users collection created');
  })
  db.createCollection('tweets', (err, client) => {
    if (err) return console.log(err);
    console.log('tweets collection created');
  })
});

// Home
// http://localhost:300/
app.get('/', (request, response) => response.send('Twutter RESTful API Simulation'));

// Use the route /api and append all of your endpoints to this URL
app.use('/api', router);

// Get Users
// http://localhost:300/api/getUsers
router.get('/getUsers', (request, response) => {
  db.collection('users').find().toArray((err, results) => {
    if (err) return console.log(err);
    response.send(results);
  })
});

// Add User
// http://localhost:300/api/addUser
router.put('/addUser', (request, response) => {
  var data = request.body;
  var newUser = {
    "firstName": data.firstName,
    "lastName": data.lastName,
    "userName": data.userName,
    "email": data.email,
    "dateOfBirth": data.dateOfBirth
  };
  db.collection('users').insertOne(newUser, (err, results) => {
    if (err) return console.log(err);
    response.send('User ' + newUser.firstName + ' ' + newUser.lastName + ' added to users collection');
  });
});

// Update User (Search by Username)
// http://localhost:300/api/updateUser
router.post('/updateUser/:userName', (request, response) => {
  var userNameToUpdate = request.params.userName;
  var data = request.body;
  var updatedUser = {
    "firstName": data.firstName,
    "lastName": data.lastName,
    "userName": data.userName,
    "email": data.email,
    "dateOfBirth": data.dateOfBirth
  };

  db.collection('users').update({userName: userNameToUpdate}, updatedUser, (err, results) => {
    if (err) return console.log(err);
    response.send('User ' + updatedUser.firstName + ' ' + updatedUser.lastName + ' updated in users collection');
  });
});

// Delete User
// http://localhost:300/api/deleteUser
router.delete('/deleteUser/:userName', (request, response) => {
  var userNameToDelete = request.params.userName;
  db.collection('users').deleteOne({userName: userNameToDelete}, (err, results) => {
    if (err) return console.log(err);
    response.send('User deleted in users collection');
  });
});

// Get Tweets (Assume Sorted by most recent)
// http://localhost:300/api/getTweets
router.get('/getTweets', (request, response) => {
  db.collection('tweets').find().sort({time: 1}).toArray((err, results) => {
    response.send(results);
  })
});

// Add Tweet
// http://localhost:300/api/addTweet
router.put('/addTweet', (request, response) => {
  var data = request.body;
  var newTweet = {
    "userName": data.userName,
    "message": data.message,
    "hashtags": data.hashtags,
    "time": data.time,
    "retweets": data.retweets
  };
  db.collection('tweets').insertOne(newTweet, (err, results) => {
    if (err) return console.log(err);
    response.send('Tweet \'' + newTweet.message + '\' added to tweets collection');
  })
});

// Update Tweet
// http://localhost:300/api/updateTweet
router.post('/updateTweet/:message', (request, response) => {
  var messageToUpdate = request.params.message;
  // Implement Me!
});

// Delete Tweet
// http://localhost:300/api/deleteTweet
router.delete('/deleteTweet/:message', (request, reponse) => {
  var messageToDelete = request.params.message;
  // Implement Me!
});

// Get Tweets By User
// http://localhost:300/api/getTweetsByUser/:userName
router.get('/getTweetsByUser/:userName', (request, response) => {
  var userName = request.params.userName;
  // Implement Me!
});

// Get Tweets By Hashtag
// http://localhost:300/api/getTweetsByHashtag/:hashtag
router.get('/getTweetsByHashtag/:hashtag', (request, response) => {
  var hashtag = request.params.hashtag;
  // Implement Me!
});

// Get Tweets Sorted By Most Retweets
// http://localhost:300/api/getTweetsByRetweets
router.get('/getTweetsByRetweets', (request, response) => {
  // Implement Me!
});

// Add more endpoints here, or add more functionality to the other endpoints

// Start Listening
app.listen(process.env.PORT || port, () => console.log(`Listening on port ${port}`));
