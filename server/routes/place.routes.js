const express = require('express');
const router = express.Router();
const preferencesCtrl = require('../controllers/preferences.controller')

router.post('/api/places', preferencesCtrl.getPreferences);
router.post('/update/preferences/:id', preferencesCtrl.updatePreferences);

module.exports = router;