const serverless = require("serverless-http");
const express = require("express");
const app = express();
// const BUCKET_URL = process.env.BUCKET_URL;

app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from root within cdk deployment!!!",
  });
});

app.get("/path", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from path!",
  });
});

app.get("/dog", (req, res, next) => {
  return res.status(200).json({
    message: "yes hello this is dog 🐶 🐶",
  });
});

// app.get("/cat", (req, res) =>
//   res.send(
//     `<div style='background-image: url(${BUCKET_URL}/tom.jpg); background-repeat: no-repeat; background-size: cover; background-position: center; height: 100%; width: 100%;'><h1 align=center>Hello, I am sleepy Tom</h1></div>`
//   )
// );

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
