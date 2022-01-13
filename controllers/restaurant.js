const Restaurant = require('../models/restaurant');

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
    Restaurant.find({}, function(err, restaurantDocuments){
      res.render('./index', {
        title: 'home page',
        restaurants: restaurantDocuments
      })
    })
}

function show(req, res){
  Restaurant.findById(req.params.id).populate('ratings').exec((err, ratings) => { 
    res.render('restaurant/index', { title: 'Reviews', restaurant : ratings });
    
  })
}

function averageReview(restaurantId){

  Restaurant.findById(restaurantId, function(err, restaurant) {
    let ratingsArray =[];
    restaurant.ratings.forEach(function(m) { 
      ratingsArray.push(m.rating);
    })
    function getAvg(grades) {
      const total = grades.reduce((acc, c) => acc + c, 0);
      return total / grades.length;
    }


    return getAvg(ratingsArray).toString();
    
  })
}