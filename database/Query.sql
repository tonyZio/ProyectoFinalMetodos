CREATE DATABASE databse_links;

UE  

CREATE TABLE teachers (
    id INT(5) NOT NULL,
    username VARCHAR (25) NOT NULL,
    password VARCHAR (30)  NOT NULL
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

ALTER TABLE links
    MODIFY id INT(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

ALTER TABLE teachers   
    MODIFY password VARCHAR (30) NULL;

ALTER TABLE courses   
    ADD semester VARCHAR (10) NULL;
    ADD hour VARCHAR (10) NULL;

DESCRIBE links;