CREATE DATABASE database_links;

USE database_links

CREATE TABLE teachers (
    id INT(5) NOT NULL,
    username VARCHAR (25) NOT NULL,
    password VARCHAT (30)  NOT NULL,
);

CREATE TABLE courses  (
    id INT(5) NOT NULL,
    name VARCHAR (25) NOT NULL,
    schedule VARCHAR (30)  NOT NULL,
);

CREATE TABLE students  (
    id INT(5) NOT NULL,
    name VARCHAR (25) NOT NULL,
    schedule VARCHAR (30)  NOT NULL,
);

ALTER TABLE users
    ADD PRIMARY KEY (id);

ALTER TABLE users
    MODIFY id INT(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE users;