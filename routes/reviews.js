var express = require('express');
var router = express.Router();
const reviewsCtrl = require('../controllers/review')

router.get('/restaurant/:id/review/new', reviewsCtrl.newReview);
router.post('/restaurant/:id/review/new', reviewsCtrl.create);
// router.get('/review/:id/edit', reviewsCtrl.edit);
router.put('/review/:id', reviewsCtrl.edit);
router.delete('/review/:id', reviewsCtrl.deleteReview);

module.exports = router;
