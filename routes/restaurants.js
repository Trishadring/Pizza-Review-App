var express = require('express');
var router = express.Router();
const restaurantCtrl = require('../controllers/restaurant')
const reviewsCtrl = require('../controllers/review')


router.get('/', restaurantCtrl.index);
router.get('/:id', restaurantCtrl.show);
router.get('/:id/review/new', reviewsCtrl.newReview);
router.post('/:id/review/new', reviewsCtrl.create);
// router.get('/review/:id/edit', reviewsCtrl.edit);
// router.put('/review/:id', reviewsCtrl.update);
router.delete('/review/:id', reviewsCtrl.delete);

module.exports = router;
