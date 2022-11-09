const express = require('express');
const router = express.Router();
const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');


/*------------------------Courses------------------*/

//AddCourses
router.get('/addcursos', isLoggedIn, (req, res) => {
    res.render('links/add/add');
})

router.post('/addcursos', isLoggedIn, async(req, res) =>{
    const {name, semester} = req.body;
    const course= {name,  semester};
    await pool.query('INSERT INTO courses set ?', [course]);
    res.redirect('/links/cursos')
})

//SelectCourses
router.get('/cursos' , isLoggedIn, async (req, res) =>{
    const courses = await pool.query('SELECT * FROM courses')
    console.log(courses);
    res.render('links/list/listcursos', {courses})
})

//EditCourses
router.get('/editcourses/:id', isLoggedIn, async (req, res) => {
    const {id} = req.params;
    const courses = await pool.query('SELECT * FROM courses WHERE ID = ?', [id])
    res.render('links/edit/editCourses', {courses:courses[0]})
})

router.post('/editcourses/:id', isLoggedIn, async(req, res) =>{
    const {id} = req.params;
    const {name, semester} = req.body;
    const course= {name,semester};
    await pool.query('UPDATE courses set ? WHERE id = ?', 
    [course, id]);
    res.redirect('/links/cursos')
})

//DeleteCourses
router.get('/deleteCourse/:id', isLoggedIn, async (req, res) =>{
    const {id} = req.params;
   await pool.query('DELETE FROM courses WHERE ID = ?', [id])
   res.redirect('/links/cursos')
})

/*---------------------Groups---------------------*/

//AddGroup
router.get('/addgroup/:id', isLoggedIn, async (req, res) => {
    const {id} = req.params;
    const courses = await pool.query('SELECT * FROM courses WHERE ID = ?', [id])
    res.render('links/add/addGroups', {course:courses[0]});
})

router.post('/addgroup/:id', isLoggedIn, async(req, res) =>{
    const {days, hours, courses_id, hourFinn} = req.body;
    const group = {days, hours, courses_id, hourFinn};
    await pool.query('INSERT INTO groups_students set ?', [group]);
    res.redirect('/links/cursos')
})

//GetGroup

router.get('/getgroup/:id', isLoggedIn, async (req, res) => {
    const {id} = req.params;
    const groups = await pool.query('SELECT * FROM courses WHERE ID = ?', [id])
    res.render('links/add/addGroups', {course:courses[0]});
})

//AsignGroups

router.get('/asignCourse/:id', isLoggedIn, async (req, res) => {
    const {id} = req.params;
    const students = await pool.query('SELECT * FROM students WHERE ID = ?', [id])
    const groups = await pool.query('SELECT * FROM groups_students')
    res.render('links/asigns/asignCourse', {student:students[0], groups})
})

router.post('/asignCourse/:id', isLoggedIn, async(req, res) =>{
   const {id} = req.params;
   const {name, semester, groups_id} = req.body;   

   const newLink = {name, semester, groups_id};
   await pool.query('UPDATE students set ? WHERE id = ?', [newLink, id]);
   res.redirect('/links/alumnos')
})

//GetGroups

router.get('/getgroups/:id', isLoggedIn, async (req, res) => {
    const {id} = req.params;
    const courses = await pool.query('SELECT * FROM courses WHERE ID = ?', [id])
    const groups = await pool.query('SELECT * FROM groups_students WHERE courses_id = ?', [id])
    const students = await pool.query('SELECT * FROM students')
    res.render('links/asigns/asignstudents', {students, groups, courses})
})

//DeleteGroup
router.get('/deletegroup/:id', isLoggedIn, async (req, res) =>{
    const {id} = req.params;
    await pool.query('DELETE FROM groups_students WHERE ID = ?', [id])
    res.redirect('/links/asignstudents')
 })

/*---------------------Students---------------------*/

//AddAlumno
router.get('/addalumno', isLoggedIn, (req, res) => {
    res.render('links/add/addalumnos');
})

router.post('/addalumno', isLoggedIn, async(req, res) =>{
    const {name, semester} = req.body;
    const student= {name, semester};
    await pool.query('INSERT INTO students set ?', [student]);
    res.redirect('/links/alumnos')
})

//ListAlumnos

router.get('/alumnos' , isLoggedIn, async (req, res) =>{
    const student = await pool.query('SELECT * FROM students')
    console.log(student);
    res.render('links/list/listalumnos', {student})
})


//DeleteAlumnos
router.get('/delete/:id', isLoggedIn, async (req, res) =>{
    const {id} = req.params;
    await pool.query('DELETE FROM students WHERE ID = ?', [id])
    res.redirect('/links/alumnos')
 })
 

 //EditAlumnos
 router.get('/editstudents/:id', isLoggedIn, async (req, res) => {
     const {id} = req.params;
     const students = await pool.query('SELECT * FROM students WHERE ID = ?', [id])
     res.render('links/edit/editstudents', {student:students[0]})
 })

 router.post('/editstudents/:id', isLoggedIn, async(req, res) =>{
    const {id} = req.params;
    const {name, semester} = req.body;

    const newLink = {name, semester};
    await pool.query('UPDATE students set ? WHERE id = ?', 
    [newLink, id]);
    res.redirect('/links/alumnos')
})


/*--------------------------Teachers-------------------------*/

//SelectMaestros
router.get('/maestros' , isLoggedIn, async (req, res) =>{
    const maestros = await pool.query('SELECT * FROM teachers')
    console.log(maestros);
    res.render('links/list/list', {maestros})
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
    const maestros = await pool.query('SELECT * FROM teachers WHERE ID = ?', [id])
    res.render('links/edit/edit', {teacher:maestros[0]})
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