var express = require('express');
var router = express.Router();
const restaurantCtrl = require('../controllers/restaurant')


router.get('/', restaurantCtrl.index);
router.get('/:id', restaurantCtrl.show);

module.exports = router;
