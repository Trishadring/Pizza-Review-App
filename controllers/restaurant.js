const Restaurant = require('../models/restaurant');
const Review = require('../models/review');

module.exports = {
	index,
  allRestaurants,
  show
}

function index(req, res){
    Review.find({}, function(err, reviewDocument){
    })
		res.render('restaurant/index')
}

function allRestaurants(req, res){
    console.log('sending allRestaurants')
    //console.log(req.user, ' req.user')
    Restaurant.find({}, function(err, restaurantDocuments){
      res.render('./index', {
        title: 'home page',
        restaurants: restaurantDocuments
      })
    })
}

function show(req, res){
  console.log(req.params, "params");
  Restaurant.findById(req.params.id).populate('ratings').exec((err, ratings) => { 
    console.log(ratings, "rating")
    res.render('restaurant/index', { title: 'Reviews', restaurant : ratings });
   
  })
}