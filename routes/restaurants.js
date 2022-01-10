var express = require('express');
var router = express.Router();
const restaurantCtrl = require('../controllers/restaurant')


router.get('/', restaurantCtrl.index);

module.exports = router;
