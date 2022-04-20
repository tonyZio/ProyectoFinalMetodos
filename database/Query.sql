CREATE DATABASE databse_links;

UE  

CREATE TABLE teachers (
    id INT(5) NOT NULL,
    username VARCHAR (25) NOT NULL,
    password VARCHAR (80)  NOT NULL
    CONSTRAINT fk_courses FOREIGN KEY (courses_id) REFERENCES courses(id) 
);

CREATE TABLE courses  (
    id INT(5) NOT NULL,
    name VARCHAR (25) NOT NULL,
    schedule VARCHAR (30)  NOT NULL,
    semester VARCHAR (10) NULL,
    hour VARCHAR (10) NULL,
    CONSTRAINT fk_teacher FOREIGN KEY (teacher_id) REFERENCES teachers(id) 
);

CREATE TABLE students  (
    id INT(5) NOT NULL,
    name VARCHAR (25) NOT NULL,
    schedule VARCHAR (30)  NOT NULL
    CONSTRAINT fk_teacher FOREIGN KEY (teacher_id) REFERENCES teachers(id) 
    CONSTRAINT fk_courses FOREIGN KEY (courses_id) REFERENCES courses(id) 
);

ALTER TABLE teachers
    ADD PRIMARY KEY (id);

ALTER TABLE teachers
    MODIFY id INT(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

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

ALTER TABLE teachers   
    MODIFY password VARCHAR (80) NULL;

ALTER TABLE courses   
    ADD hourFinn VARCHAR (10) NULL;

DESCRIBE links;


Llaves foraneas:

ALTER TABLE students
    ADD PRIMARY KEY id;

ALTER TABLE students   
    ADD teacher_id INT (5) NULL;

ALTER TABLE students
    ADD FOREIGN KEY (teacher_id) REFERENCES teachers(id);


ALTER TABLE students   
    ADD courses_id INT (5) NULL;

ALTER TABLE students
ADD FOREIGN KEY (courses_id) REFERENCES courses(id);

ALTER TABLE teachers
ADD FOREIGN KEY (students_id) REFERENCES students(id);

ALTER TABLE students


    
