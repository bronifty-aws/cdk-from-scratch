const serverless = require("serverless-http");
const express = require("express");
const app = express();
const BUCKET_URL = process.env.BUCKET_URL;

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

app.get("/cat", (req, res) =>
  res.send(`<img src="${BUCKET_URL}/dist/client/tom.jpg" alt="Tom">`)
);
app.get("/html", (req, res) => res.sendFile(`${BUCKET_URL}/index.html`));

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
