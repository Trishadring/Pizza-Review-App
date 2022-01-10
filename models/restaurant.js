const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const restaurantSchema = new Schema({
  name: String,
  address: String,
  url: String,
  logo: String,
  ratings: [{type: Schema.Types.ObjectId, ref: 'Review'}],
});


module.exports = mongoose.model('Restaurant', restaurantSchema);