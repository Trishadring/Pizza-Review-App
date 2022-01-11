var express = require('express');
var router = express.Router();
const restaurantCtrl = require('../controllers/restaurant')
const reviewsCtrl = require('../controllers/review')


router.get('/', restaurantCtrl.index);
router.get('/:id', restaurantCtrl.show);
router.get('/:id/review/new', reviewsCtrl.newReview);
router.post('/:id/review/new', reviewsCtrl.create);

module.exports = router;
