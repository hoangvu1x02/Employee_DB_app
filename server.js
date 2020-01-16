var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "Employees_DB"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    console.log('connected as id ' + connection.threadId);
    // run the start function after the connection is made to prompt the user
    start();
});

async function start() {
    try {
        var choice = await inquirer.prompt([
            {
                name: "action",
                type: "list",
                message: "What would you like to do?",
                choices: [
                    "Add new values to a table",
                    "View a table",
                    "Update values of a table",
                    "Delete a value of a table",
                    "exit"]
            },
            {
                name: "tablechoice",
                type: "list",
                message: "Which table would you like to choose?",
                choices: [
                    "departments",
                    "roles",
                    "employee"
                ]
            }
        ]);

        const { action, tablechoice } = choice;

        switch (action) {
            case "Add new values to a table":
                Add(tablechoice);
                break;

            case "View a table":
                View(tablechoice);
                break;

            case "Update values of a table":
                Update(tablechoice);
                break;

            case "Delete a value of a table":
                Delete(tablechoice);
                break;

            case "exit":
                connection.end();
                break;
        }
    } catch (err) {
        console.log(err)
    };
};

function View(tablechoice) {
    console.log(typeof (tablechoice));
    connection.query("SELECT * FROM ??", [tablechoice], function (err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
            if (tablechoice === "departments"){
                console.log("ID: " + res[i].id + " || Name: " + res[i].name);
                console.log("-----");
            } else if (tablechoice === "roles"){
                console.log("ID: " + res[i].id + " || Title: " + res[i].title + " || Salary: " + res[i].salary);
                console.log("-----");
            } else if (tablechoice === "employee"){
                console.log("ID: " + res[i].id + " || First Name: " + res[i].first_name + " || Last Name: " + res[i].last_name + " || Role_id: " + res[i].role_id + " || Manager_id: " + res[i].manager_id);
                console.log("-----");
            };
        };
        start();
    });
};

async function Add(tablechoice) {
    try {
        switch (tablechoice) {
            case "departments":
                var insertdep = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'department',
                        message: 'Please insert a new deparment'
                    }
                ]);

                const { department } = insertdep;
                
                connection.query("INSERT INTO departments SET ?;", {name: department}, function (err, res) {
                    if (err) throw err;
                    console.log(department + "has been added successfully with id: " + res.insertID);
                    console.log("======================================================")
                    start();
                });
            break;

            case "roles":
                var insertrole = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'title',
                        message: 'Please insert a title'
                    },
                    {
                        type: 'input',
                        name: 'salary',
                        message: 'Please insert salary'
                    },
                    {
                        type: 'input',
                        name: 'department_id',
                        message: 'Please insert the department_id..............NOTE: Must be a number'
                    },
                ]);

                const { title, salary, department_id } = insertrole;
                
                console.log(insertrole);

                connection.query("INSERT INTO roles SET ?", {title: title, salary: salary, department_id: department_id}, function (err, res) {
                    if (err) throw err;
                    console.log(title + "has been added successfully with id: " + res.insertID);
                    console.log("======================================================")
                    start();
                });
            break;
            case "employee":
                    var insertEmployee = await inquirer.prompt([
                        {
                            type: 'input',
                            name: 'first_name',
                            message: 'Please insert first name'
                        },
                        {
                            type: 'input',
                            name: 'last_name',
                            message: 'Please insert last name'
                        },
                        {
                            type: 'input',
                            name: 'role_id',
                            message: 'Please insert role id..........NOTE: Must be a number'
                        },
                        {
                            type: 'input',
                            name: 'manager_id',
                            message: 'Please insert manager id..........NOTE: Must be a number'
                        }
                    ]);
    
                    const { first_name, last_name, role_id, manager_id } = insertEmployee;
                    
                    console.log(insertEmployee);
    
                    connection.query("INSERT INTO employee SET ?", {first_name: first_name, last_name: last_name, role_id: role_id, manager_id: manager_id}, function (err, res) {
                        if (err) throw err;
                        console.log(first_name + last_name + " has been added successfully to employee table");
                        console.log("======================================================")
                        start();
                    });
            break;
        }

    } catch (err) {
        console.log(err)
    };
};

async function Update(tablechoice) {
    try {
        switch (tablechoice) {
            case "departments":
                var updateDep = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'department_id',
                        message: 'Please enter id of deparment you want to update'
                    },
                    {
                        type: 'input',
                        name: 'department_value',
                        message: 'Please enter a new name'
                    }
                ]);

                const { department_id, department_value } = updateDep;
                
                connection.query("UPDATE departments SET ? WHERE ?;", [{name: department_value}, {id: department_id}], function (err, res) {
                    if (err) throw err;
                    console.log("Name of department has been successfully changed to " + department_value );
                    console.log("======================================================")
                    start();
                });
            break;

            case "roles":
                var updateRole = await inquirer.prompt([
                    {
                        type: 'input',
                        name: 'role_id',
                        message: 'Please enter id of role you want to update'
                    },
                    {
                        type: 'input',
                        name: 'title',
                        message: 'Please insert a new title'
                    },
                    {
                        type: 'input',
                        name: 'salary',
                        message: 'Please insert new salary'
                    },
                    {
                        type: 'input',
                        name: 'new_department_id',
                        message: 'Please insert a new department_id..............NOTE: Must be a number'
                    },
                ]);

                const {role_id, title, salary, new_department_id } = updateRole;
                
                console.log(updateRole);

                connection.query("UPDATE roles SET ?, ?, ? WHERE ?", [{title: title}, {salary: salary}, {department_id: new_department_id}, {id: role_id}], function (err, res) {
                    if (err) throw err;
                    console.log("Information of " + title + " has been changed successfully ");
                    console.log("======================================================")
                    start();
                });
            break;
            case "employee":
                    var updateEmployee = await inquirer.prompt([
                        {
                            type: 'input',
                            name: 'employee_id',
                            message: 'Please enter id of employee you want to update'
                        },
                        {
                            type: 'input',
                            name: 'first_name',
                            message: 'Please insert new first name'
                        },
                        {
                            type: 'input',
                            name: 'last_name',
                            message: 'Please insert new last name'
                        },
                        {
                            type: 'input',
                            name: 'new_role_id',
                            message: 'Please insert new role id..........NOTE: Must be a number'
                        },
                        {
                            type: 'input',
                            name: 'manager_id',
                            message: 'Please insert new manager id..........NOTE: Must be a number'
                        }
                    ]);
    
                    const { employee_id, first_name, last_name, new_role_id, manager_id } = updateEmployee;
                    
                    console.log(updateEmployee);
    
                    connection.query("UPDATE employee SET ?, ?, ?, ? WHERE ?", [{first_name: first_name}, {last_name: last_name}, {role_id: new_role_id}, {manager_id: manager_id},{id: employee_id}], function (err, res) {
                        if (err) throw err;
                        console.log("Information of " + first_name + last_name + " has been updated successfully");
                        console.log("======================================================")
                        start();
                    });
            break;
        }

    } catch (err) {
        console.log(err)
    };   
}
