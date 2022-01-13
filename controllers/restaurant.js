const Restaurant = require('../models/restaurant');

module.exports = {
	index,
  allRestaurants,
  show,
  create,
  newRestaurant
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

  // Restaurant.findById(req.params.id, function(err, restaurant) {
  //   
  //   
  //   client.search(searchRequest).then(response => {
  //     const firstResult = response.jsonBody.businesses[0];
  //     const prettyJson = JSON.stringify(firstResult, null, 4);
  //     console.log(prettyJson);
  //   }).catch(e => {
  //     console.log(e);
  //   });
  //   console.log(searchRequest)
  // })
  
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
  console.log(req.body);
  const yelp = require('yelp-fusion');
  const apiKey = process.env.YELP_SECRET;
  const client = yelp.client(apiKey);
  console.log(req.body.text, "text");
  console.log(req.body.location, "location");
  const searchRequest = {
    term: req.body.text,
    location: req.body.location,
  };
  client.search(searchRequest).then(response => {
    const firstResult = response.jsonBody.businesses[0];
    const prettyJson = JSON.stringify(firstResult, null, 4);
    // console.log(prettyJson);
    let newR = {
      name: firstResult.name,
      address: firstResult.location.display_address.toString(),
      url: firstResult.url,
      headImg: firstResult.image_url,
      yelpId: firstResult.id
    }
    console.log(newR, "new restaurant");
    Restaurant.create(newR, function(err, restaurant){
      res.redirect('/'); 
    })
  }).catch(e => {
    console.log(e);
  });
}

function newRestaurant(req, res){
  res.render('restaurant/new', { title: 'New Restaurant'});
}
