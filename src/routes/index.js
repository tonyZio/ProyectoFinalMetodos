const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('../views/links/menu.hbs');
});

module.exports = router;