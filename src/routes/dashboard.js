const express = require('express');

const router = express.Router();
const dashboardController = require('../controllers/dashboard-controller');
;

router
  .route('/')
  .get(dashboardController.renderDashboard)
  .post(dashboardController.renderBycountry)


module.exports = router;
