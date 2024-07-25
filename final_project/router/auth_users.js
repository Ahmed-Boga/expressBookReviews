const express = require("express");
const jwt = require("jsonwebtoken");
let books = require("./booksdb.js");
const regd_users = express.Router();
const session = require("express-session");

let users = [];

const isValid = (username) => {
  //returns boolean
  //write code to check is the username is valid
  let userswithsamename = users.filter((user) => {
    return user.username === username;
  });
  // Return true if any user with the same username is found, otherwise false
  if (userswithsamename.length > 0) {
    return true;
  } else {
    return false;
  }
};

const authenticatedUser = (username, password) => {
  //returns boolean
  //write code to check if username and password match the one we have in records.
  let validusers = users.filter((user) => {
    return user.username === username && user.password === password;
  });
  // Return true if any valid user is found, otherwise false
  if (validusers.length > 0) {
    return true;
  } else {
    return false;
  }
};
const app = express();

app.use(
  session({ secret: "fingerpint" }, (resave = true), (saveUninitialized = true))
);

app.use(express.json());
//only registered users can login
regd_users.post("/login", (req, res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;

  // Check if username or password is missing
  if (!username || !password) {
    return res
      .status(404)
      .json({ message: "username &/ password are not provided." });
  }

  // Authenticate user
  if (authenticatedUser(username, password)) {
    // Generate JWT access token
    let accessToken = jwt.sign(
      {
        data: password,
      },
      "access",
      { expiresIn: 60 }
    );

    // Store access token and username in session
    req.session.authorization = {
      accessToken,
      username,
    };
    return res.status(200).send("User successfully logged in");
  } else {
    return res
      .status(208)
      .json({ message: "Invalid Login. Check username and password" });
  }
});
// localhost:5000/customer/aregister
regd_users.post("/register", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  // Check if both username and password are provided
  if (username && password) {
    // Check if the user does not already exist
    if (!isValid(username)) {
      // Add the new user to the users array
      users.push({ username: username, password: password });
      return res
        .status(200)
        .json({ message: "User successfully registered. Now you can login" });
    } else {
      return res.status(404).json({ message: "User already exists!" });
    }
  }
  // Return error if username or password is missing
  return res.status(404).json({ message: "Unable to register user." });
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const matchedBook = req.params;
  console.log(matchedBook, req.body);
  let booksObject = books;
  for (const key in booksObject) {
    if (matchedBook["isbn"] == key.valueOf()) {
      // console.log(matchedBook["isbn"], key.valueOf());
      books[key]["reviews"] = req.body;
    }
  }
  // res.send(booksObject);
  return res
    .status(200)
    .json({ message: `A Review is added to ${matchedBook["isbn"]}` });
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const matchedBook = req.params;
  let deletdReview;
  let booksObject = books;
  for (const key in booksObject) {
    if (matchedBook["isbn"] == key.valueOf()) {
      deletdReview = booksObject[key]["reviews"];
      // console.log(matchedBook["isbn"], key.valueOf());
      booksObject[key]["reviews"] = {};
    }
  }
  return res.status(200).json({
    message: `The Review with ISBN ${matchedBook["isbn"]}  is deleted`,
  }); // return res.status(300).json({ message: "Yet to be implemented" });
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
