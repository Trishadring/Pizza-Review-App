const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  name: String,
  date: Date,
  ratingDetails: String,
  photo: String,
  rating: Number,
  userId: String,
  comment: String,
  cost: Number,
});

const restaurantSchema = new Schema({
  name: String,
  address: String,
  url: String,
  logo: String,
  headImg: String,
  ratings: [reviewSchema],
});

module.exports = mongoose.model('Restaurant', restaurantSchema, );