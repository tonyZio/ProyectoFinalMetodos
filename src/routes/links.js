const express = require('express');
const router = express.Router();

const pool = require('../database');
router.get('/add', (req, res) => {
    res.render('links/add');
})


router.post('/add', async(req, res) =>{
    const {username, password} = req.body;
    const newLink= {
        username,
        password
    };
    await pool.query('INSERT INTO teachers set ?', [newLink]);
    res.send('recieved');
})


router.get('/maestros' , async (req, res) =>{
    const links = await pool.query('SELECT * FROM teachers')
    console.log(links);
    res.send('reddf')
})
module.exports = router;