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
  let form = req.body;
  Restaurant.findById(req.params.id, function(err, restaurant) {
    restaurant.ratings.push({
      name: form.name,
      date: new Date(),
      ratingDetails: [],
      photo: form.photo,
      rating: parseFloat(req.body.rating),
      userId: form.userId,
      comment: form.comment,
      cost: parseInt(req.body.cost),
   });
   
    restaurant.save(function(err){
			res.redirect(`/restaurant/${restaurant._id}`)
      console.log(restaurant.ratings, "ratings after save")
		})
	});
}

