const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');


router.get('/add', isLoggedIn, (req, res) => {
    res.render('links/add');
})

router.get('/cursos', isLoggedIn, (req, res) => {
    res.render('links/listcursos');
})

router.get('/addcursos', isLoggedIn, (req, res) => {
    res.render('links/addcursos');
})

router.get('/alumnos', isLoggedIn, (req, res) => {
    res.render('links/listalumnos');
})

//AddCurso
router.post('/add', isLoggedIn, async(req, res) =>{
    const {name,  apptBegg, apptFin, semestre, days} = req.body;
    const newLink= {name,  apptBegg, apptFin, semestre, days};
    await pool.query('INSERT INTO courses set ?', [newLink]);
    res.redirect('/links/cursos')
})

//SelectMaestros
router.get('/maestros' , isLoggedIn, async (req, res) =>{
    const links = await pool.query('SELECT * FROM teachers')
    console.log(links);
    res.render('links/list', {links})
})

//SelectCourses
router.get('/cursos' , isLoggedIn, async (req, res) =>{
    const linke = await pool.query('SELECT * FROM courses')
    console.log(linke);
    res.render('links/listcursos', {linke})
})

//DeleteTeachers
router.get('/delete/:id', isLoggedIn, async (req, res) =>{
    const {id} = req.params;
   await pool.query('DELETE FROM teachers WHERE ID = ?', [id])
   res.redirect('/links/maestros')
})

//EditMaestros
router.get('/edit/:id', isLoggedIn, async (req, res) => {
    const {id} = req.params;
    const teachers = await pool.query('SELECT * FROM teachers WHERE ID = ?', [id])
    res.render('links/edit', {teacher:teachers[0]})
})

router.post('/edit/:id', isLoggedIn, async(req, res) =>{
    const {id} = req.params;
    const {username,password} = req.body;

    const newLink = {username, password};
    await pool.query('UPDATE teachers set ? WHERE id = ?', 
    [newLink, id]);
    res.redirect('/links/maestros')
})


module.exports = router;