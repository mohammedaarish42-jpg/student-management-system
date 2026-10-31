CREATE DATABASE IF NOT EXISTS student_db;
USE student_db;

CREATE TABLE IF NOT EXISTS students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    course VARCHAR(100) NOT NULL,
    age INT NOT NULL
);

INSERT INTO students (name, email, course, age) VALUES
('Aarav Shah', 'aarav@example.com', 'Computer Science', 20),
('Priya Nair', 'priya@example.com', 'Mathematics', 21);
