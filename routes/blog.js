const express = require("express");

const mongodb = require("mongodb");

const db = require("../data/database");

const ObjectId = mongodb.ObjectId;
// ObjectId is a function that is used to convert req.body.author into an ObjectId format

const router = express.Router();

router.get("/", function (req, res) {
  res.redirect("/posts");
});

router.get("/posts", function (req, res) {
  res.render("posts-list");
});

router.get("/new-post", async function (req, res) {
  // const documentsCursor = await db.getDb().collection("authors").find();
  // We can get access to the database by using getDb()
  // getDb() is a function we created on the database.js file.
  // .find() will return a promise. Therefor we should use async await
  // The above code will give us us a "cursor" that points to the documents on the authors collection.
  // Cursor is a tool that can be used to move through the documents that were fetched step by step.
  // It can be helpful if we fetch a "large" amount of documents and if we wanna work with them in chucks
  // But as there are few authors in our database, we can use the following code instead.
  const authors = await db.getDb().collection("authors").find().toArray();
  // This will output all the author documents as an JavaScript array.
  // So we don't have to do a conversion by our own.

  // console.log(authors);
  // Output==============================================================================================
  // [
  //   {
  //     _id: ObjectId("62c713fac676cf78b043aa04"),
  //     name: "Avishka Indula",
  //     email: "indula@email.com",
  //   },
  //   {
  //     _id: ObjectId("62c71402c676cf78b043aa05"),
  //     name: "Janith Wimalasiri",
  //     email: "janith@email.com",
  //   },
  // ];

  res.render("create-post", { authors: authors });
  // authors: authors will make the authors data available on create-post.ejs
});

router.post("/posts", async function (req, res) {
  const authorId = new ObjectId(req.body.author);
  // .author is the name we inserted to the dropdown.
  // What will be submitted for the option that was chosen is the value of that option
  // the value of an option is "author._id"
  // Therefor the above code will give us the "id" of the author that was chosen.
  // But this will give us a string, therefor we could consider storing it as an object
  // Which means to convert it into an ObjectId format
  const author = await db
    .getDb()
    .collection("authors")
    .findOne({ _id: authorId });
  // This will reach out to the authors collection and find us the matching author document to the
  // value of req.body.author
  // This is an async operation. Therefor we need to run async await here.
  // We have run an extra query just to insert a new document but that's how MongoDB works.
  // So we're doing some manual merging of authors collection and the posts collection.

  // "/posts" is the action we created on the form on the create-post.ejs file.
  const newPost = {
    title: req.body.title,
    summary: req.body.summary,
    body: req.body.content,
    // .title, .summary, .content are the names we inserted as attributes to the create-post.ejs file.
    date: new Date(),
    // MongoDB will be able to work with this JS date object and sore it in the database correctly.

    author: {
      id: authorId,
      // authorId will give us the "Id" of the author as mentioned above.
      // .author in "new ObjectId(req.body.author)"" is the name we inserted to the dropdown.
      // What will be submitted for the option that was chosen is the value of that option
      // the value of an option is "author._id"
      // Therefor the above code will give us the "id" of the author that was chosen.
      name: author.name,
      // author is the constant on const author = await db.getDb().collection("authors").findOne({ _id: authorId });
      email: author.email,
    },
    // For author, we wanna store a nested object because we wanna store both ID and the name in the Posts collection to.
  };

  const result = await db.getDb().collection("posts").insertOne(newPost);
  // This is how we create a collection named "posts" and insert data to it.
  // We should also "await" for it.
  console.log(result);

  res.redirect("/posts");
  // This will redirect the users to the posts-list.ejs page.
});

module.exports = router;
