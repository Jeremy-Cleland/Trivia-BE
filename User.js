"use strict";

const mongoose = require("mongoose");
const { Schema } = mongoose;

// schema is the structure of the document
const userSchema = new Schema({
  _id: { type: String, required: true },
  picture: { type: String, required: true },
  score: { type: String, required: true },
});

// user is the name of the collection
const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
