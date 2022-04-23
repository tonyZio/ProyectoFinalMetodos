const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');


//AddCourses
router.get('/addcursos', isLoggedIn, (req, res) => {
    res.render('links/add/add');
})

//ListAlumnos
router.get('/alumnos', isLoggedIn, (req, res) => {
    res.render('links/list/listalumnos');
})

//AddCurso
router.post('/addcursos', isLoggedIn, async(req, res) =>{
    const {name,  hourBegg, hourFinn, semester, days} = req.body;
    const course= {name, hourBegg, hourFinn, semester, days};
    await pool.query('INSERT INTO courses set ?', [course]);
    res.redirect('/links/cursos')
})

//SelectMaestros
router.get('/maestros' , isLoggedIn, async (req, res) =>{
    const maestros = await pool.query('SELECT * FROM teachers')
    console.log(maestros);
    res.render('links/list/list', {maestros})
})

//SelectCourses
router.get('/cursos' , isLoggedIn, async (req, res) =>{
    const courses = await pool.query('SELECT * FROM courses')
    console.log(courses);
    res.render('links/list/listcursos', {courses})
})

//DeleteTeachers
router.get('/delete/:id', isLoggedIn, async (req, res) =>{
    const {id} = req.params;
   await pool.query('DELETE FROM teachers WHERE ID = ?', [id])
   res.redirect('/links/maestros')
})

//DeleteCourses
router.get('/deleteCourse/:id', isLoggedIn, async (req, res) =>{
    const {id} = req.params;
   await pool.query('DELETE FROM courses WHERE ID = ?', [id])
   res.redirect('/links/cursos')
})

//EditMaestros
router.get('/edit/:id', isLoggedIn, async (req, res) => {
    const {id} = req.params;
    const teachers = await pool.query('SELECT * FROM teachers WHERE ID = ?', [id])
    res.render('links/edit/edit', {teacher:teachers[0]})
})

router.post('/edit/:id', isLoggedIn, async(req, res) =>{
    const {id} = req.params;
    const {username,password} = req.body;

    const newLink = {username, password};
    await pool.query('UPDATE teachers set ? WHERE id = ?', 
    [newLink, id]);
    res.redirect('/links/maestros')
})

//EditCourses
router.get('/editCourse/:id', isLoggedIn, async (req, res) => {
    const {id} = req.params;
    const courses = await pool.query('SELECT * FROM courses WHERE ID = ?', [id])
    res.render('links/edit/editCourses', {courses:courses[0]})
})

router.post('/editCourse/:id', isLoggedIn, async(req, res) =>{
    const {id} = req.params;
    const course= {name, hourBegg, hourFinn, semester, days};
    await pool.query('UPDATE courses set ? WHERE id = ?', 
    [course, id]);
    res.redirect('/links/courses')
})


module.exports = router;