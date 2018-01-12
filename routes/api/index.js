const express = require('express')
const router = express.Router()

router.get('/aye', (req, res) => {
    res.send('aye aye');
});

module.exports = router;
