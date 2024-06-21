SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;

SELECT department_id, name FROM department

SELECT role.id, role.title, role.salary, department.name AS department
FROM role
LEFT JOIN department ON role.department_id = department.id

SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name, manager_id AS department 
FROM employee 
LEFT JOIN role ON employee.role_id = role.id






