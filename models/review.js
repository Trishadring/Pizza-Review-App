const mongoose = require('mongoose');


const sauceSchema = new Schema({
  description: {type:Array, enum: ['Sweet', 'Savory','Tangy','Spicy','Thin','Chunky']},
  CSR: Array
});

const crustSchema = new Schema({
  thickness: {
    type:String, 
    enum: ['Thin', 'Medium','Thick']
  },
  description: {
    type:Array, 
    enum: ['Buttery', 'Crispy','Spongy','Bubbly','Chewy']
  },
  burn: Number,
  rating:{
    type: Number,
    min:0,
    max:5
    },
});

const ratingDetailsSchema = new Schema({
  cheese:  {
    type:Array, 
    enum: ['Greasy', 'Stringy','Smokey','Stinky','Creamy','Salty']
  },
  toppings: Array,
  crust: [crustSchema],
  sauce: [sauceSchema]
});

const reviewSchema = new mongoose.Schema({
  name: String,
  date: Date,
  ratingDetails: [ratingDetailsSchema],
  photo: String,
  rating: Number,
  userId: {type: Schema.Types.ObjectId, ref: 'User'},
  comment: String,
  cost: Number,
  username: String
});

module.exports = mongoose.model('Review', reviewSchema);