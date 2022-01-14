const Restaurant = require('../models/restaurant');


module.exports = {
	index,
  allRestaurants,
  show,
  create,
  newRestaurant
}

function index(req, res){
    Review.find({}, function(err, reviewDocument){})
		res.render('restaurant/index')
}

function allRestaurants(req, res){
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
// icebox

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

function create(req, res){ 
  const yelp = require('yelp-fusion');
  const apiKey = process.env.YELP_SECRET;
  const client = yelp.client(apiKey);
  const searchRequest = {
    term: req.body.text,
    location: req.body.location,
  };
  console.log(req.body)
  client.search(searchRequest).then(response => {
    const firstResult = response.jsonBody.businesses[0];
    const prettyJson = JSON.stringify(firstResult, null, 4);
    let newR = {
      name: firstResult.name,
      address: firstResult.location.display_address.toString(),
      url: firstResult.url,
      headImg: firstResult.image_url,
      yelpId: firstResult.id
    }
    Restaurant.findOne({yelpId :newR.yelpId}, function (err, isRestaurant) {
      if (isRestaurant){
        res.redirect('/');
      }
      else{
        Restaurant.create(newR, function(err, restaurant){
          res.redirect('/'); 
        })
      }
    })
  }).catch(e => {
    console.log(e);
  });
}

function newRestaurant(req, res){
  res.render('restaurant/new', { title: 'New Restaurant'});
}
