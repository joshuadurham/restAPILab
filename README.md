
# restAPILab

#### What is this lab about

This lab is from the 2018 Web Dev Weekend Talk for RESTful API Design. The lab goes through building endpoints for a server that simulates a basic Twitter service for managing users and tweets.

If you want more information on MongoDB queries, or want to add more functionality to your endpoints, check out the [MongoDB collection documentation](https://docs.mongodb.com/manual/reference/method/js-collection/)

#### Downloading necessary software

The three main pieces of software needed to work on this lab are [Node.js](https://nodejs.org/en/) with the Node Package Manage (NPM), [MongoDB](https://www.mongodb.com/download-center/community), and some API testing environment such as [Postman](https://www.getpostman.com/apps). The download instructions should be fairly straightforward for each of the above pieces of software. While an API testing environment is not entirely necessary since you can test endpoints through a browser such as Google Chrome, it makes it much easier to send messages in the body of PUT and POST commands. 

#### Setting up this project

Immediately after cloning the repository, run 'npm install' from the directory where the repository is stored. This will install all the necessary packages (Express, MongoClient, etc.) for running the project.

Then run the command 'mongod' in one terminal in order to start up the MongoDB database. Take note of the port that you need to access the database through (The last message the terminal spits out should be 'waiting for connections on port 27017' or similar), as you will need to modify the index.js file to connect to the database.

In the index.js file, modify the URL to connect to the MongoDB database (see lines 20-35 in index.js) in order to make your Node project connect to your local database instance.

Finally, run 'node index.js' in another terminal to start up the Node project and run your RESTful API server. You should be able to access the endpoints you have written both through Postman as well as through a browser such as Google Chrome.

#### Your Task

You have been selected as the first intern at 'Twutter', an up-and-coming social media startup that needs help building up a backend for their social media service. Your task is to help design and build the endpoints for their RESTful API so that the frontend application can access tweets and user information from the database.

The Twutter database currently has the structure of two collections

##### Users Collection

* firstName

* lastName

* userName

* email

* dateOfBirth

##### Tweets Collection

* userName

* message

* hashtags

* time

* retweets

As seen in the index.js file, some of the endpoints have already been implemented for you. It is your job to implement the remaining endpoints and add more functionality to the server.  Have fun!