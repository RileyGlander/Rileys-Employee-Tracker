DROP DATABASE IF EXISTS employee_tracker_db;
CREATE DATABASE employee_tracker_db;
USE employee_tracker_db;

CREATE TABLE department (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(30)
);

CREATE TABLE role (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT
);

CREATE TABLE employee (
  id INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT
);

-- INSERT INTO bestsellers (title, author, price) VALUES
--("book1", "author1", 19.95),
--("book2", "author2", 19.95),
--("book3", "author3", 19.95);



-- SELECT * FROM books.bestsellers
-- INNER JOIN A_RELATED_TABLE
-- ON DATA_THEY_HAVE_IN_COMMON
-- SELECT FROM bestsellers WHERe id = 3

-- #These are the same 
-- UPDATE bestsellers SET price = 9.95 WHERE price = 19.95  
-- UPDATE bestsellers SET price = 9.95 WHERE id = 2 OR id = 3 OR id = 4