var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "password",
  database: "employee_trackerDB"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  start();
});

// function which prompts the user for what action they should take
function start() {
  inquirer
    .prompt({
      name: "whatWouldYouLikeToDo",
      type: "list",
      message: "What would you like to do?",
      choices: ["View All Employees", "View All Roles", "View All Departments", "Add Employee", "Add Department", "Add Role", "Update Employee Role", "Exit"]
    })
    .then(function(answer) {
      if (answer.whatWouldYouLikeToDo === "View All Employees") {
        viewAllEmployees();
      } else if (answer.whatWouldYouLikeToDo === "View All Roles") {
          viewAllRoles();
        } else if (answer.whatWouldYouLikeToDo === "View All Departments") {
            viewAllDepartments();
        } else if (answer.whatWouldYouLikeToDo === "Add Employee") {
            addEmployee();
        } else if (answer.whatWouldYouLikeToDo === "Add Department") {
            addDepartment();
        } else if (answer.whatWouldYouLikeToDo === "Add Role") {
            addRole();
        } else if (answer.whatWouldYouLikeToDo === "Update Employee Role") {
            updateEmployeeRole();
        } else {
            connection.end();
        }
    });
}

function viewAllEmployees() {
  // Find all employees, join with roles and departments to display their roles, salaries, departments, and managers
  var query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary FROM employee LEFT JOIN role ON employee.role_id = role.id";
  connection.query(query, function(err, res){
    if (err) throw err;
    // Prints the employee table to the screen
    console.table(res)
    start();
  })
}

function viewAllRoles() {
  // Find all roles, join with departments to display the department name
  var query = "SELECT role.id, role.title, department.name, role.salary  FROM role JOIN department ON role.department_id = department.id";
  connection.query(query, function(err, res){
    if (err) throw err;
    // Prints the role table to the screen
    console.table(res)
    start();
  })
}


function viewAllDepartments() {
  // Find all departments, join with employees and roles and sum up utilized department budget
  var query = "SELECT department.id, department.name FROM department";
  connection.query(query, function(err, res){
    if (err) throw err;
    // Prints the department table to the screen
    console.table(res)
    start();
  })
}


function addEmployee() {
  // grab new employee info from user
  inquirer
    .prompt([
      {
        name: "addEmployeeFirst_Name",
        type: "input",
        message: "What is the first name of the new employee?"
      },
      {
        name: "addEmployeeLast_Name",
        type: "input",
        message: "What is the last name of the new employee?"
      },
      {
        name: "addEmployeeRole",
        type: "input",
        message: "What is the role id for the new employee?"
      },
      {
        name: "addManager_id",
        type: "input",
        message: "What is the manager id for the new employee?"
      }
    ]).then(function(answer) {
      // MySQL query to create a new employee
      var query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
      if (answer.first_name != "" & answer.last_name != "" & answer.role_id != "" & answer.manager_id != "") {
        connection.query(query, [answer.addEmployeeFirst_Name, answer.addEmployeeLast_Name, answer.addEmployeeRole, answer.addManager_id], function(err, res) {
          if (err) throw err;
          //console.log to alert user new employee was created
          console.log("A new employee has been created");
          start();
        }
      )}
    })
}

function addDepartment() {
  // grab new department info from the user
  inquirer
    .prompt([
      {
        name: "addDepartment",
        type: "input",
        message: "Enter name of new department"
      }
    ]).then(function(answer) {
      // Create a new department 
      var query = "INSERT INTO department (name) VALUES (?)";
      connection.query(query, answer.addDepartment, function(err, res) {
        if (err) throw err;
        //console.log to alert user deprtment was created
        console.log("A new department has been created");
        start();
      })
    })
}

function addRole() {
  //get new role info from user (title, salary, department_id)
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "What is the title of the role that you would like to add?"
      },
      {
        name: "salary",
        type: "input",
        message: "What is the salary for this role?"
      },
      {
        name: "department_id",
        type: "input",
        message: "What is the department id for this role?"
      }
    ]).then(function(answer) {
    // Create a new role with sql query
      var query = "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)";
      if (answer.title != "" & answer.salary != "" & answer.department_id != "") {
        connection.query(query, [answer.title, answer.salary, answer.department_id], function(err, res) {
          if (err) throw err;
          //console.log to alert user deprtment was created
          console.log("A new role has been created");
          start();
        }
      )}
    })   
}

// function updateEmployeeRole() {
//   var employeeArray = [];
//   var roleArray = [];

//    // find all employees
//   var employeeSearch = "SELECT id, first_name, last_name, role_id FROM employee";
//   connection.query(employeeSearch, function(err, res) {
//     for (let i = 0; i < res.length; i++) {
//       employeeData = { name: res[i].first_name + " " + res[i].last_name, value: res[i].id };
//       employeeArray.push(employeeData);
//     }

//     // find all roles
//     var roleSearch = "SELECT role.id, role.title FROM role";
//     connection.query(roleSearch, function(err, role) {
//       for (let i = 0; i < role.length; i++) {
//         roleData = { name: role[i].title, value: role[i].id };
//         roleArray.push(roleData);
//       }
//     })
//   })

//   // prompt user to select which employee to update and then which role to assign employee
//   inquirer
//     .prompt([
//       {
//         name: "selectEmployee",
//         type: "list",
//         message: "Select an employee to update",
//         choices: employeeArray
//       },
//       {
//         name: "assignRole",
//         type: "list",
//         message: "Select an employee to update",
//         choices: roleArray
//       }
//     ]).then(function(answer) {
//       //MySQL query update with employeeId and roleID
//       var query = "UPDATE employee SET role_id=? WHERE employee.id=?";
//       if (answer.selectEmployee != "") {
//         connection.query(query, [answer.assignRole, answer.selectEmployee], function(err, res) {
//           if (err) throw err;
//           //console.log you have updated an employee
//           console.log("An employee's record has been updated");
//           start();
//         })
//       }
//     })
// }
