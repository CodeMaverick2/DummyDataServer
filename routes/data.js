const express = require('express');
const { getData } = require('../controllers/dataController');

const router = express.Router();

// Route to handle GET requests to /api/data
router.get('/data', getData);

module.exports = router;
