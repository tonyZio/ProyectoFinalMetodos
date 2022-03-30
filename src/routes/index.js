const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Menu Principal');
});

module.exports = router;