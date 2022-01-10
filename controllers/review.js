
const Review = require('../models/review');

module.exports = {
	index 
}

function index(req, res){
    console.log('sending')
    .find({}, function(err, reviewDocument){
      console.log(reviewDocument);
    })
		res.render('index')
}