var express = require('express');
var router = express.Router();
const restaurantCtrl = require('../controllers/restaurant')

router.get('/new', restaurantCtrl.newRestaurant);
router.get('/', restaurantCtrl.index);
router.get('/:id', restaurantCtrl.show);
router.post('/', restaurantCtrl.create);

module.exports = router;
