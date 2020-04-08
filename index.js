// VARIABLES ================================================
const fs = require("fs");
const inquirer = require("inquirer");
const axios = require("axios");

const apiKey = ""; // insert your GitHub API key inside the quotation marks

const markdown = require("./utils/generateMarkdown.js")

// COMMAND-LINE PROMPTS ================================================
const questions = [
    {
        type: 'input',
        name: 'username',
        message: 'What is your GitHub USERNAME?' 
    },
    {
        type: 'input',
        name: 'repoName',
        message: 'What is the NAME of your GitHub repository? (must be exact!)' 
    },
    {
        type: 'input',
        name: 'title',
        message: 'What is the TITLE of your project?' 
    },
    {
        type: 'input',
        name: 'description',
        message: 'Enter a DESCRIPTION of the project. (press ENTER key to leave blank)',
        default: function() {
            return "";
        } 
    }
];

// WRITE USER INFO INTO A FILE ================================================
function writeToFile(answers, response) {
    // console.log(markdown(answers, response));
    fs.writeFile("README.md", markdown(answers, response), function(err) {
        if (err) {
            return console.log(err)
        }
        console.log(`successfully created "${answers.title}" README.md for ${answers.username}`)
    });
}

// COLLECT USER INFO, CALL API, CREATE MARKDOWN FILE ================================================
function init() {
    inquirer
        .prompt(questions)
        .then(function(answers) {
            console.log("collected user info", answers);
            const queryUrl = `https://api.github.com/users/${answers.username}?access_token=${apiKey}`
            // console.log("full URL", queryUrl);
            axios
                .get(queryUrl)
                .then(function(response) {
                    // console.log("get API response", response.data);
                    writeToFile(answers, response);
                })
        });
}

// CALL FUNCTION ================================================
init();