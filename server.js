const inquirer = require("inquirer");
const mysql = require("mysql2");

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'employee_tracker_db'
});

const mainMenu = [
  {
    name: "mainMenu",
    type: "list",
    message: "What would you like to do?",
    choices: [
      "view all departments",
      "view all roles",
      "view all employees",
      "add a department",
      "add a role",
      "add an employee",
      "update an employee role"
    ]
  }

];



function viewAllDepartments() {
  db.query('SELECT * FROM department', function (err, results) {
    if (err) {
      console.log("Error retrieving departments from the database", err);
    } else {
      console.log("Results:", results);
    }
  });
}

function viewAllRoles() {
  db.query('SELECT * FROM role', function (err, results) {
    if (err) {
      console.log("Error retrieving roles from the database", err);
    } else {
      console.log("Results:", results);
    }
  });
}


function viewAllEmployees() {
  db.query('SELECT * FROM employee', function (err, results) {
    if (err) {
      console.log("Error retrieving employees from the database", err);
    } else {
      console.log("Results:", results);
    }
  });
}


function addDepartment() {
  inquirer.prompt([
    {
      type: "input",
      message: "What is the name of the department",
      name: "department_name"
    }
  ]).then((results) => {
    const departmentName = results.department_name;
    db.query('INSERT INTO department (name) VALUES (?)', [departmentName], (err, results) => {
      if (err) {
        console.log("Error adding department to the database", err);
      } else {
        console.log("Department added successfully");
      }
    });
  });
}


function addRole() {
  inquirer.prompt([
    {
      type: "input",
      message: "What is the name of the role",
      name: "role_name"
    },
    {
      type: "input",
      message: "What is the salary of the role",
      name: "role_salary"
    },
    {
      type: "input",
      message: "What is the department of the role",
      name: "role_department"
    }
  ]).then((results) => {
    const roleName = results.role_name;
    const roleSalary = results.role_salary;
    const roleDepartment = results.role_department;
    console.log(results.name);
    db.query('INSERT INTO role (name, salary, department) VALUES (?, ?, ?)', [roleName, roleSalary, roleDepartment], (err, results) => {
      if (err) {
        console.log("Error adding role to the database", err);
      } else {
        console.log("Role added successfully");
      }
    });
  });
}


function addEmployee() {
  inquirer.prompt([
    {
      type: "input",
      message: "What is the first name of the employee",
      name: "first_name"
    },
    {
      type: "input",
      message: "What is the last name of the employee",
      name: "last_name"
    },
    {
      type: "input",
      message: "What is the name of the employee's role",
      name: "employee_role"
    },
    {
      type: "input",
      message: "What is the name of the manager",
      name: "manager_name"
    }
  ]).then((results) => {
    const firstName = results.first_name;
    const lastName = results.last_name;
    const employeeRole = results.employee_role;
    const managerName = results.manager_name;
    db.query('INSERT INTO employee (first_name, last_name, employee_role, manager_name) VALUES (?, ?, ?, ?)', [firstName, lastName, employeeRole, managerName], (err, results) => {
      if (err) {
        console.log("Error adding employee to the database", err);
      } else {
        console.log("Employee added successfully");
      }
    });
  });
}


function updateEmployee() {
  db.query('SELECT * FROM employee', function (err, employeeResults) {
    if (err) {
      console.log("Error retrieving employees from the database", err);
      return;
    }

    db.query('SELECT * FROM role', function (err, roleResults) {
      if (err) {
        console.log("Error retrieving roles from the database", err);
        return;
      }
    
          const employeeChoices = employeeResults.map(employee => {
            return {
              name: `${employee.first_name} ${employee.last_name}`,
              value: employee.id
            };
          });
    
          const roleChoices = roleResults.map(role => {
            return {
              name: role.name,
              value: role.id
            };
          });
    
         inquirer.prompt([
    {
      type: "list",
      message: "Which employee do you want to update",
      name: "update_employee",
      choices: employeeChoices
    },
    {
      type: "list",
      message: "Which role do you want to assign to the selected employee",
      name: "update_role",
      choices: roleChoices
    } 
    
    ]).then((results) => {
      const employee_id = results.update_employee;
      const roleId = results.update_role;
      db.query('UPDATE employee SET role_id = ? WHERE id = ?', [roleId, employee_id], function (err, results) {
        if (err) {
          console.log("Error updating employee role in the database", err);
          return;
        }
        console.log("Employee role updated successfully")
      })
      })
    });
  });
}

  
  

function init() {
  inquirer
    .prompt(mainMenu)
    .then(handleUserSelection);
}

function handleUserSelection(answers) {
  const selection = answers.mainMenu;

  if (selection === "view all departments") {
    viewAllDepartments();
  } else if (selection === "view all roles") {
    viewAllRoles();
  } else if (selection === "view all employees") {
    viewAllEmployees();
  } else if (selection === "add a department") {
    addDepartment();
  } else if (selection === "add a role") {
    addRole();
  } else if (selection === "add an employee") {
    addEmployee();
  } else if (selection === "update an employee role") {
    updateEmployee();
  } else {
    console.log("Invalid selection");
  }
}

init();