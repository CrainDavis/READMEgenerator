const axios = require("axios");
const fs = require("fs");
const inquirer = require("inquirer");

const apiKey = "8080339eaa88eca4749b49aaac6149fd070ada65";

// ================================================

const questions = [
    {
        type: 'input',
        name: 'username',
        message: 'What is your GitHub username?' 
    },
    {
        type: 'input',
        name: 'title',
        message: 'What is the TITLE of your project?' 
    }
];

function writeToFile(fileName, data) {
}

function init() {
    inquirer
        .prompt(questions)
        .then(function(answers) {
            console.log("prompt answers", answers);
            const queryUrl = `https://api.github.com/users/${answers.username}?access_token=${apiKey}`
            console.log("full URL", queryUrl);
            axios
                .get(queryUrl)
                .then(function(response) {
                    console.log("get API response", response.data);
                })
        });
}

init();
