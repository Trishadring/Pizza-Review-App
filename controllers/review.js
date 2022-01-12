const Restaurant = require('../models/restaurant');
var mongoose = require('mongoose');

module.exports = {
	newReview,
  create,
  deleteReview,
  edit
}


function newReview(req, res){
  console.log("review new review function")
  Restaurant.findById(req.params.id, function(err, restaurant) {
    res.render('review/new', { title: 'New Review', restaurant : restaurant });
	});
}


function create(req, res){
  console.log("review create function")
  let form = req.body;
  Restaurant.findById(req.params.id, function(err, restaurant) {
    restaurant.ratings.push({
      name: form.name,
      date: new Date(),
      ratingDetails: [],
      photo: form.photo,
      rating: parseFloat(req.body.rating),
      userId: form.userId,
      rating: form.rating,
      cost: parseInt(req.body.cost),
   });
   
    restaurant.save(function(err){
			res.redirect(`/restaurant/${restaurant._id}`)
      console.log(restaurant.ratings, "ratings after save")
		})
	});
}

function deleteReview(req, res) {
  console.log("review delete review function")
  console.log(req.params);
  console.log(req.user);
 
  Restaurant.findOne(
    {'ratings._id': req.params.id, 
    'ratings.userId': req.user.userId},
    function(err, restaurant) {
      if (!restaurant || err) return res.redirect(`/restaurants/${restaurant._id}`);
      // Remove the subdoc (https://mongoosejs.com/docs/subdocs.html)
      // restaurant.review.id(_id).remove();
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
  // Note the cool "dot" syntax to query on the property of a subdoc
  Restaurant.findOne({'ratings._id': req.params.id}, function(err, restaurant) {
    // Find the rating subdoc using the id method on Mongoose arrays
    // https://mongoosejs.com/docs/subdocs.html
    const ratingSubdoc = restaurant.ratings.id(req.params.id);
    // Ensure that the rating was created by the logged in user
    //if (!ratingSubdoc.userId.equals(req.user._id)) return res.redirect(`/restaurants/${restaurant._id}`);
    // Update the text of the rating
    ratingSubdoc.comment = req.body.text;
    // Save the updated restaurant
    restaurant.save(function(err) {
      // Redirect back to the restaurant's show view
      res.redirect(`/restaurant/${restaurant._id}`);
    });
  });
}