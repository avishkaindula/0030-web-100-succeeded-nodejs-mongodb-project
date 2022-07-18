const path = require("path");

const express = require("express");

const blogRoutes = require("./routes/blog");
const db = require("./data/database");
// Now we can use db to call the connectToDatabase function.

const app = express();

// Activate EJS view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true })); // Parse incoming request bodies
app.use(express.static("public")); // Serve static files (e.g. CSS files)

app.use(blogRoutes);

app.use(function (error, req, res, next) {
  // Default error handling function
  // Will become active whenever any route / middleware crashes
  console.log(error);
  res.status(500).render("500");
});
// This is the "default error handling middleware."
// This default error handling middleware won't catch the errors caused by the async 
// route middleware functions created on the blog.js file. Instead the server crashes.

// This is how we connect to the database===========================================================
db.connectToDatabase().then(function () {
  app.listen(3000);
});
// This will return a promise.
// But instead of using "await", we should use "then"
// This code tells to execute app.listen(3000) only after the database connection is established.

// =================================================================================================
// db.connectToDatabase();
// app.listen(3000);
// =================================================================================================
