const express = require('express');
const router = express.Router();

const pool = require('../database');
router.get('/cursos', (req, res) => {
    res.render('links/add');
})


router.post('/add', (req, res) =>{
    res.send('recieved');
})

module.exports = router;