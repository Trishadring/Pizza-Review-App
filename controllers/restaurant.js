const Restaurant = require('../models/restaurant');
const Review = require('../models/review');

module.exports = {
	index,
  allRestaurants
}

function index(req, res){
    console.log('sending')
    Review.find({}, function(err, reviewDocument){
      console.log(reviewDocument);
    })
		res.render('restaurant/index')
}

function allRestaurants(req, res){
    console.log('sending')
    Restaurant.find({}, function(err, restaurantDocument){
      console.log(restaurantDocument);
    })

		res.render('./index')
}