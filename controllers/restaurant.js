const Restaurant = require('../models/restaurant');
const Review = require('../models/review');

module.exports = {
	index,
  allRestaurants,
  show
}

function index(req, res){
    console.log('sending')
    Review.find({}, function(err, reviewDocument){
      console.log(reviewDocument);
    })
		res.render('restaurant/index')
}

function allRestaurants(req, res){
    console.log('sending allRestaurants')
    Restaurant.find({}, function(err, restaurantDocuments){
      console.log(restaurantDocuments);
      res.render('./index', {
        title: 'home page',
        restaurants: restaurantDocuments
      })
    })
}

function show(req, res){
  Restaurant.findById(req.params.id).populate('ratings').exec((err, ratings) => {
    
    console.log("Populated Restaurant " + ratings);
    res.render('restaurant/index', { title: 'Reviews', restaurant : ratings });
  })
}