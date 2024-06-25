const inquirer = require("inquirer");
const fs = require("fs");
const { Pool } = require("pg");

// Connect to database
const pool = new Pool(
  {
    user: 'postgres',
    password: '',
    host: 'localhost',
    database: 'employees_db'
  },
)
pool.connect();

console.log('Connected to the employees_db database!')

// List of questions
const questionsList = () => {
    inquirer.prompt([
        {
            type: "list",
            name: "option",
            message: "What would you like to do?",
            choices: ["View All Departments", "View All Roles", "View All Employees",   "Add Department", "Add Role", "Add Employee", "Update Employee Role", "Quit"]
        }
    ]).then(answers => {
        switch (answers.option) {
            case "View All Departments":
                viewAllDepartments();
                break;
            case "View All Roles":
                viewAllRoles();
                break;
            case "View All Employees":
                viewAllEmployees();
                break;
            case "Add Department":
                addDepartment();
                break;
            case "Add Role":
                addRole();
                break;
            case "Add Employee":
                addEmployee();
                break;
            case "Update Employee Role":
                updateEmployeeRole();
                break;
            case "Quit":
                quit();
                break;
        }
    });
};
// Function to view all departments
const viewAllDepartments = () => {
    const query = `SELECT * FROM department`;
    pool.query(query, (err, res) => {
        if (err) throw err;
        console.log('Viewing all departments');
        console.table(res.rows);
        questionsList();       
    });
};

// Function to view all roles
const viewAllRoles = () => {
    rolesArray = [];
    const query = `SELECT * FROM role`;
    pool.query(query, (err, res) => {
        if (err) throw err;
        res.rows.forEach(({title}) => rolesArray.push(title));
        console.log('Viewing all roles');
        console.table(res.rows);
        questionsList();
    });
};

// Function to view all employees
const viewAllEmployees = () => {
   
    const query = `SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.name AS department, CONCAT(manager.first_name, ' ', manager.last_name) AS manager  FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id
    LEFT JOIN employee AS manager ON employee.manager_id = manager.id`;
    pool.query(query, (err, res) => {
        if (err) throw err;
        console.log('Viewing all employees');
        console.table(res.rows);
        questionsList();
    });
};

// Function to add a department
const addDepartment = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "department",
            message: "What is the name of the department?",
        }
    ]).then(answers => {
        const query = `INSERT INTO department (name) VALUES ($1)`;
        pool.query(query, [answers.department], (err, res) => {
            if (err) throw err;
            console.log('Department added');
            questionsList();
        });
    });
};

// Function to add a role
const addRole = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "role",
            message: "What is the name of the role?",
        },
        {
            type: "input",
            name: "salary",
            message: "What is the salary of the role?",
        },
        {
            type: "input",
            name: "departmentId",
            message: "What is the department id?",
        },
    ]).then(answers => {
        const query = `INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)`;
        pool.query(query, [answers.role, answers.salary, answers.departmentId], (err, res) => {
            if (err) throw err;
            console.log('Role added');
            questionsList();
        });
    });
};

// Function to add an employee
const addEmployee = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "firstName",
            message: "What is the employee's first name?",
        },
        {
            type: "input",
            name: "lastName",
            message: "What is the employee's last name?",
        },
        {
            type: "input",
            name: "roleId",
            message: "What is employee's role id?",
        },
        {
            type: "input",
            name: "managerId",
            message: "What is employee's manager id?",
        },
    ]).then(answers => {
        const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)`;
        pool.query(query, [answers.firstName, answers.lastName, answers.roleId, answers.managerId], (err, res) => {
            if (err) throw err;
            console.log('Employee added');
            questionsList();
        });
    });
};

// Function to update an employee's role
const updateEmployeeRole = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "employeeId",
            message: "What is the employee's id?",
        },
        {
            type: "input",
            name: "employeeTitle",
            message: "What is the employee's new role?",
        }
    ]).then(answers => {
        const query = `UPDATE employee SET role_id = $1 WHERE id = $2`;
        pool.query(query, [answers.employeeTitle, answers.employeeId], (err, res) => {
            if (err) throw err;
            console.log('Employee role updated');
            questionsList();
        });
    });
};

questionsList();
