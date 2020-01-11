DROP DATABASE IF EXISTS Employees_DB;

CREATE DATABASE Employees_DB;

USE Employees_DB;

CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE roles (
  id INT NOT NULL,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2),
  department_id INT NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES departments(id)
);


CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NULL,
  manager_id INT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (role_id) REFERENCES roles(id)
);

-- departments input
INSERT INTO departments (name)
VALUES ("IT");

INSERT INTO departments (name)
VALUES ("Finance");

INSERT INTO departments (name)
VALUES ("Human Resource");

INSERT INTO departments (name)
VALUES ("Marketing");

INSERT INTO departments (name)
VALUES ("Customer Service");


-- roles input
INSERT INTO roles (id, title, salary, department_id)
VALUES (101,"Receptionist", 40000, 5);

INSERT INTO roles (id, title, salary, department_id)
VALUES (102,"Communication Officer", 45000, 5);

INSERT INTO roles (id, title, salary, department_id)
VALUES (103,"Sales Representative", 50000, 4);

INSERT INTO roles (id, title, salary, department_id)
VALUES (104,"Maketing Manager", 55000, 4);

INSERT INTO roles (id, title, salary, department_id)
VALUES (105,"Recuitment Officer", 52000, 3);

INSERT INTO roles (id, title, salary, department_id)
VALUES (106,"Consultant", 65000, 3);

INSERT INTO roles (id, title, salary, department_id)
VALUES (107,"Accountant", 40000, 2);

INSERT INTO roles (id, title, salary, department_id)
VALUES (108,"Director", 80000, 2);

INSERT INTO roles (id, title, salary, department_id)
VALUES (109,"Senior Developer", 75000, 1);

INSERT INTO roles (id, title, salary, department_id)
VALUES (110,"Data Analyst", 60000, 1);

--Employee input
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jadyn", "Mullen", 107, 2);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Markus", "Wong", 108);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Aydin", "Rojas", 101, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Leilani", "Ray", 109, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Brittany", "Dixon", 102, 2);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Gina", "Sharp", 106);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Dashawn", "Lyons", 110);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Lainey", "Adkins", 103, 9);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Aydan", "Terry", 104, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Janae", "Mathews", 105, 6);

