var router = require('express').Router();
const passport = require('passport');

const restaurantCtrl = require('../controllers/restaurant')



router.get('/', restaurantCtrl.allRestaurants);


module.exports = router;
