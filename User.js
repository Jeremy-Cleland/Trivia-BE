'Use Strict';
const mongoose = require('mongoose');
const { Schema } = mongoose;
// schema is the structure of the document
const userSchema = new Schema({
  account: { type: String, required: true },
  name: { type: String, required: false },
  picture: { type: String, required: false },
  location: { type: String, required: false },
});
// book is the name of the collection
const UserModel = mongoose.model('user', userSchema);










module.exports = UserModel;