CREATE DATABASE IF NOT EXISTS sketch_guess;
USE sketch_guess;

CREATE TABLE IF NOT EXISTS user (
    id INT PRIMARY KEY AUTO_INCREMENT,
    email varchar (255),
    password VARCHAR(255)
);