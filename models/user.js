const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  username: String,
  photo: String, //avatar
  googleId: String // <-- This property needs to be on your user model for your project
});


module.exports = mongoose.model('User', userSchema);