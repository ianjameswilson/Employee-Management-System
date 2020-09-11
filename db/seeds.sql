INSERT INTO department (name)
VALUES 
	("Sales"),
    ("Engineering"), 
    ("Finance"), 
    ("Legal");

INSERT INTO role (title, salary, department_id)
VALUES 
	("Sales Lead", 100000, 1),
    ("Sales Person", 80000, 1),
    ("Lead Engineer", 150000, 2),
    ("Software Engineer", 120000, 2),
    ("Accountant", 125000, 3),
    ("Legal Team Lead", 250000, 4),
    ("Lawyer", 190000, 4);

INSERT INTO manager (name, manager_id)
VALUES
    ("Ashley Rodriguez", 1),
    ("John Doe", 2),
    ("Sarah Lourd", 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id) 
VALUES 
    ("John", "Doe", 1, 1),
    ("Mike", "Chan", 2, 2),
    ("Ashley", "Rodriguez", 3),
    ("Kevin", "Tupik", 4, 1),
    ("Malia", "Brown", 5),
    ("Sarah", "Lourd", 6),
    ("Tom", "Allen", 7, 3);