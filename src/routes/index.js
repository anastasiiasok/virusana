const express = require('express');

const router = express.Router();
const indexController = require('../controllers/index-controller');

router.get('/', indexController.index);
router.get('/item/:id', indexController.detail);
router.post('/bid', indexController.sendBid);



module.exports = router;
