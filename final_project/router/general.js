const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();
// const axios = require("axios");

public_users.post("/register", (req, res) => {
  //Write your code here
  return res.status(300).json({ message: "Yet to be implemented" });
});

// Get the book list available in the shop
public_users.get("/", async function (req, res) {
  const book = await books;
  // console.log(book);
  //Write your code here
  res.send(JSON.stringify(book));
  // return res.status(300).json({message: "Yet to be implemented"});
});

// Get book details based on ISBN
public_users.get("/isbn/:isbn", async function (req, res) {
  //Write your code here
  const booksObject = await books;
  console.log(booksObject);
  const matchedAuthor = req.params;
  let matchedElement;
  for (const key in booksObject) {
    // console.log(matchedAuthor["author"], booksObject[key]["author"]);
    if (matchedAuthor["isbn"] == key.valueOf()) {
      matchedElement = booksObject[key];
    }
  }
  res.send(matchedElement);
  // return res.status(300).json({ message: "Yet to be implemented" });
});

// Get book details based on author
public_users.get("/author/:author", async function (req, res) {
  //Write your code here
  const booksObject = await books;
  console.log(booksObject);
  const matchedAuthor = req.params;
  let matchedElement = [];
  for (const key in booksObject) {
    // console.log(matchedAuthor["author"], booksObject[key]["author"]);
    if (matchedAuthor["author"] == booksObject[key]["author"]) {
      matchedElement.push(booksObject[key]);
    }
  }
  // console.log(matchedElement);
  res.send(matchedElement);
  // return res.status(300).json({ message: "Yet to be implemented" });
});

// Get all books based on title
public_users.get("/title/:title", async function (req, res) {
  //Write your code here
  const matchedBook = req.params;
  const booksObject = await books;
  console.log(booksObject);
  let matchedElement;
  for (const key in booksObject) {
    // console.log(matchedAuthor["author"], booksObject[key]["author"]);
    if (matchedBook["title"] == booksObject[key]["title"]) {
      matchedElement = booksObject[key];
    }
  }
  res.send(matchedElement);
});

//  Get book review
public_users.get("/review/:isbn", async function (req, res) {
  //Write your code here
  const matchedBook = req.params;
  console.log(matchedBook);
  const booksObject = await books;
  console.log(booksObject);
  let matchedElement;
  for (const key in booksObject) {
    if (matchedBook["isbn"] == key.valueOf()) {
      console.log(matchedBook["isbn"], key.valueOf());
      matchedElement = booksObject[key]["reviews"];
    }
  }
  res.send(matchedElement);
});

module.exports.general = public_users;
