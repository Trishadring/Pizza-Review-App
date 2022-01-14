const Restaurant = require('../models/restaurant');
var mongoose = require('mongoose');

module.exports = {
	newReview,
  create,
  deleteReview,
  edit
}

function newReview(req, res){
  Restaurant.findById(req.params.id, function(err, restaurant) {
    res.render('review/new', { title: 'New Review', restaurant : restaurant });
	});
}

 function create(req, res){
  let form = req.body;
   Restaurant.findById(req.params.id, async function(err, restaurant) {
    restaurant.ratings.push({
      name: form.name,
      date: new Date(),
      photo: form.photo,
      rating: parseFloat(req.body.rating),
      userId: form.userId,
      rating: form.rating,
      comment: form.comment,
      cost: parseFloat(req.body.cost)
   });
    restaurant.save(function(err){})
    res.redirect(`/restaurant/${restaurant._id}`)
	});
}

function deleteReview(req, res) {
  Restaurant.findOne(
    {'ratings._id': req.params.id, 
    'ratings.userId': req.user.userId},
    function(err, restaurant) {
      if (!restaurant || err) return res.redirect(`/restaurant/${restaurant._id}`);
      restaurant.ratings.remove(req.params.id);
      // Save the updated restaurant
      restaurant.save(function(err) {
        // Redirect back to the restaurant's show view
        res.redirect(`/restaurant/${restaurant._id}`);
      });
    }
  );
}

function edit(req, res) {
  Restaurant.findOne({'ratings._id': req.params.id}, function(err, restaurant) {
    const ratingSubdoc = restaurant.ratings.id(req.params.id);
    ratingSubdoc.comment = req.body.text;
    restaurant.save(function(err) {
      res.redirect(`/restaurant/${restaurant._id}`);
    });
  });
}