CREATE DATABASE IF NOT EXISTS tt_assignment_db;

USE tt_assignment_db;

CREATE TABLE IF NOT EXISTS users (
    -- id INT AUTO_INCREMENT PRIMARY KEY,
    hn INT(6) PRIMARY KEY,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone_number VARCHAR(15),
    email VARCHAR(100)
);

DELETE FROM users;

INSERT INTO users VALUES
    (012345, 'Jane', 'Doe', '0981020726', '17nim.m@gmail.com');
