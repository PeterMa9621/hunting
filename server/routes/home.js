const express = require('express');
const crypto = require('crypto');
const router = express.Router();

router.get('/', (req, res) => {
    const hash = crypto.createHash('sha256');
    hash.update('mjy159357');
    res.send(hash.digest('hex'));
});

module.exports = router;