const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/add', (req, res) => {
    res.render('links/add');
})

//AddMaestro
router.post('/add', async(req, res) =>{
    const {username, password} = req.body;
    const newLink= {
        username,
        password
    };
    await pool.query('INSERT INTO teachers set ?', [newLink]);
    req.flash('success', 'Maestro agregado exitoso')
    res.redirect('/links/maestros')
})

//SelectMaestros
router.get('/maestros' , async (req, res) =>{
    const links = await pool.query('SELECT * FROM teachers')
    console.log(links);
    res.render('links/list', {links})
})

//Delete
router.get('/delete/:id', async (req, res) =>{
    const {id} = req.params;
   await pool.query('DELETE FROM teachers WHERE ID = ?', [id])
   res.redirect('/links/maestros')
})

//EditMaestros
router.get('/edit/:id', async (req, res) => {
    const {id} = req.params;
    const teachers = await pool.query('SELECT * FROM teachers WHERE ID = ?', [id])
    console.log(teachers);
    res.render('links/edit', {teacher:teachers[0]})
     
})

router.post('/edit/:id', async(req, res) =>{
    const {id} = req.params;
    const {username,password} = req.body;

    const newLink = {username, password};
    await pool.query('UPDATE teachers set ? WHERE id = ?', 
    [newLink, id]);
    
    res.redirect('/add')
})


module.exports = router;