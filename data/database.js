// // We can manage the connection to the database from here.
// // So whenever we wanna use the connection, we can just reach out to this file.
// // So we don't need to establish a new connection in every file we wanna work with the database.

// const mongodb = require("mongodb");

// const MongoClient = mongodb.MongoClient;
// // This is the thing that we want from the package to establish a connection.
// // The course instructor didn't use camel case to name the MongoClient.

// let database;
// // We need to make this variable available outside of this file as well.

// async function connect() {
//   // We can call the connect method on MongoClient
//   // It will create a connection to the mongodb server.
//   // We should provide the url of the server as the first parameter.
//   // As our mongodb server runs on the localhost:27017, it will be the URl.
//   // "mongodb" on the URl is a protocol.
//   // This will return a "promise" as connecting to the database does take time that is longer.
//   // So We need to use async await.
//   const client = await MongoClient.connect("mongodb://localhost:27017");
//   // This connection will automatically be a connection pool.
//   // So multiple connections will be established.
//   // So whenever we want to run a query we will automatically get an open connection.
//   database = client.db("blog");
//   // This connection will automatically be a connection pool.
//   // So multiple connections will be established.
//   // So whenever we want to run a query we will automatically get an open connection.
// }
// // So whenever we call the "connect" function from anywhere in our code it will establish a connection.

// // ======================================================================================================

// // const mongodb = require("mongodb");

// // const MongoClient = mongodb.MongoClient;
// // const client = new MongoClient("mongodb://localhost:27017");

// // let database;

// // async function connect() {
// //   try {
// //     await client.connect();
// //     database = client.db("blog");
// //     console.log("MongoDB connected...");
// //   } catch (err) {
// //     console.log("Error connecting to database...");
// //     process.exit(1);
// //   }
// // }

// // =======================================================================================================

// function getDb() {
//   if (!database) {
//     throw { message: "Database connection not established!" };
//   }
//   // This is how we check whether the database hasn't been set or not.

//   return database;
// }
// // This is the first step to make the "database" available outside of this file.

// module.exports = {
//   connectToDatabase: connect,
//   getDb: getDb,
// };
// // This is an object that will expose both getDb and connect function to the outside world.
// // We do not add parenthesis after connect and getDb.
// // It will ensure that the functions hasn't been executed yet, but instead that can be executed in other files.

// // Now we can connect this file to app.js

const mongodb = require("mongodb");

const MongoClient = mongodb.MongoClient;

let database;

async function connect() {
  const uri =
    "mongodb+srv://avishka_indula:p7iGGaREtxbhN3t3@cluster0.ibnu8y4.mongodb.net/?retryWrites=true&w=majority";

  const client = await MongoClient.connect(uri);
  database = client.db("blog");
}

function getDb() {
  if (!database) {
    throw { message: "Database connection not established!" };
  }
  // This is how we check whether the database hasn't been set or not.

  return database;
}

module.exports = {
  connectToDatabase: connect,
  getDb: getDb,
};
