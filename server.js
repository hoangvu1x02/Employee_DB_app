var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "hoangvu1906",
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
            console.log("ID: " + res[i].id + " || Name: " + res[i].name);
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
                    console.log(title + "has been added successfully with id: " + res);
                    console.log("======================================================")
                    start();
                });
            break;
        }

    } catch (err) {
        console.log(err)
    };
}