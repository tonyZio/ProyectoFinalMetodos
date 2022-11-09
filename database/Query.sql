CREATE DATABASE databse_links;

UE  

CREATE TABLE teachers (
    id INT(5) NOT NULL,
    username VARCHAR (25) NOT NULL,
    password VARCHAR (80)  NOT NULL
    CONSTRAINT fk_courses FOREIGN KEY (courses_id) REFERENCES courses(id) 
);

CREATE TABLE courses  (
    id INT(5) NOT NULL PRIMARY KEY,
    name VARCHAR (25) NOT NULL,
    schedule VARCHAR (30)  NOT NULL,
    semester VARCHAR (10) NULL,
    hour VARCHAR (10) NULL,
    CONSTRAINT fk_teacher FOREIGN KEY (teacher_id) REFERENCES teachers(id) 
);


CREATE TABLE groups_students
(  
 id_num int NOT NULL PRIMARY KEY,  
 days varchar (30)  NOT NULL,
    hours varchar (10) NOT NULL,
    courses_id INT (5)  NOT NULL
);  

CREATE TABLE students  (
    id INT(5) NOT NULL PRIMARY KEY,
    name VARCHAR (25) NOT NULL,
    semester VARCHAR (30)  NOT NULL,
    teacher_id INT(5) NULL,
    groups_id INT(5) NULL
);

CONSTRAINT fk_teacher FOREIGN KEY (teacher_id) REFERENCES teachers(id), 
    CONSTRAINT fk_courses FOREIGN KEY (groups_id) REFERENCES groups_students(id_num) 

CREATE TABLE groups (
    id INT(5) NOT NULL,
    hourFinn VARCHAR (25) NOT NULL,
    hourBegg VARCHAR (25) NOT NULL,
    days VARCHAR (50) NOT NULL,
);


ALTER TABLE teachers
    ADD PRIMARY KEY (id);

ALTER TABLE students
    MODIFY id int NOT NULL PRIMARY KEY;



DESCRIBE teachers;

CREATE TABLE links (
    id INT(11) NOT NULL,
    title VARCHAR (150) NOT NULL,
    url VARCHAR(255) NOT NULL,
    description TEXT,
    teacher_id INT(11),
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_teacher FOREIGN KEY (teacher_id) REFERENCES teachers(id) 
);

ALTER TABLE links
    ADD PRIMARY KEY (id);

ALTER TABLE students
    MODIFY id INT(5) PRIMARY_KEY NOT NULL  AUTO_INCREMENT, AUTO_INCREMENT = 2;

ALTER TABLE courses
    RENAME COLUMN hour TO hourBegg;

ALTER TABLE groups_students  
    MODIFY days VARCHAR (255) NOT NULL;

ALTER TABLE groups_students 
    ADD hourFinn VARCHAR (10) NULL;

ALTER TABLE students 
    ADD groups_id VARCHAR (10) NULL;

SHOW CREATE TABLE students;

ALTER TABLE students
DROP CONSTRAINT `students_ibfk_2`;

DESCRIBE links;

ALTER TABLE courses
DROP COLUMN hourBegg;

ALTER TABLE courses
DROP COLUMN hourFinn;

ALTER TABLE courses
DROP COLUMN days;


Llaves foraneas:

ALTER TABLE students
    ADD PRIMARY KEY id;

ALTER TABLE students   
    ADD teacher_id INT (5) NULL;

ALTER TABLE groups_students
    ADD FOREIGN KEY (courses_id) REFERENCES courses(id);


ALTER TABLE courses;   
    MODIFY name INT (65) NOT NULL;

ALTER TABLE students
ADD FOREIGN KEY (courses_id) REFERENCES courses(id);

ALTER TABLE groups_students   
    ADD students_id INT (5) NULL;

ALTER TABLE groups_students
    ADD FOREIGN KEY (students_id) REFERENCES students(id);


ALTER TABLE courses
ADD PRIMARY KEY (id);

ALTER TABLE courses
    DROP COLUMN schedule;

ALTER TABLE courses
ADD days varchar(30);


SET FOREIGN_KEY_CHECKS = 1;

ALTER TABLE students MODIFY id int NOT NULL AUTO_INCREMENT;
SET foreign_keys_checks = 1;

ALTER TABLE teachers MODIFY id int NOT NULL AUTO_INCREMENT;
ALTER TABLE students MODIFY id int NOT NULL AUTO_INCREMENT;

ALTER TABLE groups_students
    ALTER COLUMN id_num INT(5) PRIMARY_KEY NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;
    MODIFY teacher_id FOREIGN KEY (teacher_id) REFERENCES teachers(id); 

ALTER TABLE groups_students
DROP FOREIGN KEY `groups_students_ibfk_1`;

ALTER TABLE groups_students   
    MODIFY courses_id INT (5) NOT NULL;
ALTER TABLE groups_students  
    MODIFY id_num int NOT NULL AUTO_INCREMENT;
