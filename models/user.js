const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  photo: String, //avatar
  userId: String // <-- This property needs to be on your user model for your project
});


module.exports = mongoose.model('User', userSchema);