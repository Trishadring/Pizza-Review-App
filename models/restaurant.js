const mongoose = require('mongoose');


const restaurantSchema = new mongoose.Schema({
  name: String,
  address: String,
  url: String,
  logo: String,
  ratings: [{type: Schema.Types.ObjectId, ref: 'Review'}],
});


module.exports = mongoose.model('Restaurant', restaurantSchema);