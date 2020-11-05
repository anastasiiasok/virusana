const express = require('express');

const router = express.Router();
const dashboardController = require('../controllers/dashboard-controller');
;

router
  .route('/')
  .get(dashboardController.renderDashboard)



module.exports = router;
