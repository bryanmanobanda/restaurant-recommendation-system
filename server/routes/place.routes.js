const express = require('express');
const router = express.Router();

router.get('/api/places', (req, res) => {
    res.json({
        status: 'Api Works'
    });
});

module.exports = router;