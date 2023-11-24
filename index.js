const inquirer = require("inquirer");
const mysql = require("mysql2");
const express = require("express");

const PORT = process.env.PORT || 3001;
const app = express();

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'employee_tracker_db'
});

db.connect(err => {
  if (err) throw err;
  console.log(`Connected to the employee_tracker_db database.`);
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

