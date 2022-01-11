const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const postsRoutes = require("./routes/posts");
const userRoutes = require("./routes/user");

const mongoose = require("mongoose");
const app = express();

mongoose
  .connect("mongodb://localhost:27017/mymessages")
  .then(() => {
    console.log("Mongodb connected");
  })
  .catch(() => {
    console.log("Mongodb connection failed!");
  });



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// dosyalara client tarafından ulaşılması için
app.use("/images", express.static(path.join("backend/images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use('/api/posts', postsRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
