const Review = require('../models/review');
const Restaurant = require('../models/restaurant');
var mongoose = require('mongoose');

module.exports = {
	newReview,
  create,
  delete: deleteReview
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

function deleteReview(req, res) {
  // Note the cool "dot" syntax to query on the property of a subdoc
  Restaurant.findOne(
    {'review._id': req.params.id, 'review.userId': req.user._id},
    function(err, restaurant) {
      if (!restaurant || err) return res.redirect(`/restaurants/${restaurant._id}`);
      // Remove the subdoc (https://mongoosejs.com/docs/subdocs.html)
      restaurant.review.remove(req.params.id);
      // Save the updated restaurant
      restaurant.save(function(err) {
        // Redirect back to the restaurant's show view
        res.redirect(`/restaurants/${restaurant._id}`);
      });
    }
  );
}
