const inquirer = require("inquirer");
const questions = {};

function createListQuestion(key, message, choices) {
    return register({ key: key, name: "decision", type: "list", message: message, choices: choices });
}

function createBasicQuestion(key, message) {
    return register({key: key, name: "decision", message: message});
}

function register(question) {
    questions[question.key] = question;

    return question;
}

createListQuestion("action", "Where would you like to do?", ["Move", "Eat", "Rest", "Forage", "Stats", "Exit"]);
createListQuestion("move", "Where would you like to go?", ["North", "East", "South", "West"]);
createListQuestion("exit", "Are you sure you want to exit? All progress will be lost!", ["Yes", "No"]);
createBasicQuestion("name", "What is your name?");
createListQuestion("weapon", "What weapon do you choose?", ["Dagger", "Bow", "Axe"]);
createListQuestion("race", "What is your race?", ["Hume", "Elf", "Orc"]);

async function getResponse(question) {
    let {decision} = await inquirer.prompt(question);

    return decision;
}

async function prompt(questionName) {
    let response;

    while(!response) response = await getResponse(questions[questionName.toLowerCase()]);

    return response;
}

module.exports = { createListQuestion, createBasicQuestion, prompt }