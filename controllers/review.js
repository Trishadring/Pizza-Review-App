const Review = require('../models/review');
const Restaurant = require('../models/restaurant');

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
  
  req.body.rating = parseInt(req.body.rating);
  req.body.cost = parseInt(req.body.cost);
  console.log(reg.body);
  Restaurant.findById(req.params.id, function(err, restaurant) {
    Review.create(req.body, function(err, reviewDocument){ // response from the database
      res.redirect(`/restaurant/${req.body.restaurant}`); 
    })
	});
}

