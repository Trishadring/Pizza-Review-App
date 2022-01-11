const Review = require('../models/review');
const Restaurant = require('../models/restaurant');
var mongoose = require('mongoose');

module.exports = {
	newReview,
  create
}


function newReview(req, res){
  Restaurant.findById(req.params.id, function(err, restaurant) {
    res.render('review/new', { title: 'New Review', restaurant : restaurant });
	});
}


function create(req, res){
  req.body.rating = parseFloat(req.body.rating);
  req.body.cost = parseInt(req.body.cost);
  req.body.date = new Date();
  Restaurant.findById(req.params.id, function(err, restaurant) {
    restaurant.ratings.push(req.body);
    console.log(restaurant, " <- this is restaurant, in create reviews CTRL")
    restaurant.save(function(err){
			// redirect the user back to the show page

			res.redirect(`/restaurant/${restaurant._id}`)
		})
	});
}

