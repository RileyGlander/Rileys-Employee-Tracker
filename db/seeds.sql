INSERT INTO department (name) VALUES ("Computers");

INSERT INTO role (id, title, salary, department_id) VALUES
(1, "IT Support", 97000, 1),
(2, "IT Support Lead", 150000, 1),
(3, "Software Developer", 110000, 1),
(4, "Software Developer Lead", 170000, 1);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id) VALUES
(48920, "Jack", "Nelson", 1, 2),
(28905, "James", "Burns", 2, NULL),
(51432, "Melissa", "Rose", 3, 4),
(275423, "Aaron", "Smith", 4, NULL);