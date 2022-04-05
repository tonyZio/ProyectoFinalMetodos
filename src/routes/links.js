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
    res.redirect('/links/maestros')
})

router.post('/addcursos', async(req, res) =>{
    const {username, password} = req.body;
    const newLink= {
        name,
        schedule,
        description
    };
    await pool.query('INSERT INTO teachers set ?', [newLink]);
    res.redirect('/links/cursos')
})

router.post('/addalumnos', async(req, res) =>{
    const {username, password} = req.body;
    const newLink= {
        name,
        schedule,
        description
    };
    await pool.query('INSERT INTO students set ?', [newLink]);
    res.redirect('/links/alumnos')
})


router.get('/maestros' , async (req, res) =>{
    const links = await pool.query('SELECT * FROM teachers')
    console.log(links);
    res.render('links/list', {links})
})

router.get('/cursos' , async (req, res) =>{
    const links = await pool.query('SELECT * FROM courses')
    console.log(links);
    res.render('links/list', {links})
})

router.get('/alumnos' , async (req, res) =>{
    const links = await pool.query('SELECT * FROM students')
    console.log(links);
    res.render('links/list', {links})
})

router.get('/delete/:id', async (req, res) =>{
    const {id} = req.params;
   await pool.query('DELETE FROM teachers WHERE ID = ?', [id])
   res.redirect('/links/maestros')
})
module.exports = router;