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
      res.render('./index', {
        title: 'home page',
        restaurants: restaurantDocuments
      })
    })
}

function show(req, res){

 return Restaurant.findById(req.params.id)
        .populate('ratings').exec((err, ratings) => {
          console.log("Populated Restaurant " + ratings);
          res.render('restaurant/index', { title: 'Reviews', restaurant : ratings });
        })
}

// function show(req, res){
//   Restaurant.findById(req.params.id, function(err, restaurant) {
//     //try .map
//     let reviewArray = [];
//     restaurant.ratings.forEach((review) => { Review.findById( review , function(err, r){
//       reviewArray.push(r);
//       reviewArray = reviewArray.save();
//       console.log(reviewArray,"reviewArray inside" );
//     }) })
//     console.log(reviewArray,"reviewArray" );
//     
// 	});
// }
