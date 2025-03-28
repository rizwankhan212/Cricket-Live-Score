const express = require('express');
const router = express.Router();
const { getLiveScores } = require('../controllers/scoreController');

// Route to get live scores
router.get('/live-scores', getLiveScores);

module.exports = router;
