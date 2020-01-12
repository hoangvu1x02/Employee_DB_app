DROP DATABASE IF EXISTS Employees_DB;

CREATE DATABASE Employees_DB;

USE Employees_DB;

CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2),
  department_id INT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (department_id) REFERENCES departments(id)
);


CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
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
INSERT INTO roles (title, salary, department_id)
VALUES ("Receptionist", 40000, 5);

INSERT INTO roles (title, salary, department_id)
VALUES ("Communication Officer", 45000, 5);

INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Representative", 50000, 4);

INSERT INTO roles (title, salary, department_id)
VALUES ("Maketing Manager", 55000, 4);

INSERT INTO roles (title, salary, department_id)
VALUES ("Recuitment Officer", 52000, 3);

INSERT INTO roles (title, salary, department_id)
VALUES ("Consultant", 65000, 3);

INSERT INTO roles (title, salary, department_id)
VALUES ("Accountant", 40000, 2);

INSERT INTO roles (title, salary, department_id)
VALUES ("Director", 80000, 2);

INSERT INTO roles (title, salary, department_id)
VALUES ("Senior Developer", 75000, 1);

INSERT INTO roles (title, salary, department_id)
VALUES ("Data Analyst", 60000, 1);

--Employee input
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jadyn", "Mullen", 7, 2);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Markus", "Wong", 8);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Aydin", "Rojas", 1, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Leilani", "Ray", 9, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Brittany", "Dixon", 2, 2);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Gina", "Sharp", 6);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Dashawn", "Lyons", 10);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Lainey", "Adkins", 3, 9);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Aydan", "Terry", 4, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Janae", "Mathews", 5, 6);

