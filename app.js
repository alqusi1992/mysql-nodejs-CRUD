const express = require("express");
const mysql = require("mysql");

const app = express();

// Create connection
const db = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "nodemysql",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySql Connected...");
});

app.get("/createdb", (req, res) => {
  let sql = "CREATE DATABASE nodemysql";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("database created");
  });
});

// create table
app.get("/createpoststable", (req, res) => {
  let sql =
    "CREATE TABLE posts(number int, title VARCHAR(255), body VARCHAR(255))";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Posted table created...");
  });
});

// insert  post one

app.get("/addpost1", (req, res) => {
  let post = { number: 1, title: "Post One", body: "this is post number one" };

  let sql = "INSERT INTO posts SET ?";
  let query = db.query(sql, post, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Post 1 added... ");
  });
});

// insert  post two

app.get("/addpost2", (req, res) => {
  let post = { number: 2, title: "Post two", body: "this is post number two" };

  let sql = "INSERT INTO posts SET ?";
  let query = db.query(sql, post, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Post 2 added... ");
  });
});

// select  post

app.get("/getposts", (req, res) => {
  let sql = "SELECT * FROM posts";
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Post fetched");
  });
});

// select  single post

app.get("/getpost/:number", (req, res) => {
  let sql = `SELECT * FROM posts WHERE number = ${req.params.number}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Post fetched");
  });
});

// update post

app.get("/updatedpost/:number", (req, res) => {
  let newTitle = "Updated Title";
  let sql = `UPDATE posts SET title = '${newTitle}' WHERE number = ${req.params.number}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Post Updated");
  });
});

// delete post

app.get("/deletepost/:number", (req, res) => {
  let sql = `DELETE FROM posts WHERE number = ${req.params.number}`;
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Post DELETED");
  });
});

app.listen("3000", () => {
  console.log("Server started on port 3000");
});
