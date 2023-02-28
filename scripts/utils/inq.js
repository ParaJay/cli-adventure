const inquirer = require("inquirer");
const questions = {};
const generic = "What would you like to do?";

function createListQuestion(key, message, choices) {
    return register({ key: key, name: "decision", type: "list", message: message, choices: choices });
}

function createBasicQuestion(key, message) {
    return register({key: key, name: "decision", message: message});
}

function createConfirmQuestion(key, message) {
    return createListQuestion(key, message, ["Yes", "No"]);
}

function register(question) {
    questions[question.key] = question;

    return question;
}

createListQuestion("main", generic, ["Move", "Action", "Journal", "Stats", "Logs", "Exit"]);
createListQuestion("action", generic, ["Eat", "Rest", "Forage"]);
createListQuestion("move", "Where would you like to go?", ["North", "East", "South", "West"]);
createConfirmQuestion("exit", "Are you sure you want to exit? All progress will be lost!");
createBasicQuestion("name", "What is your name?");
createListQuestion("weapon", "What weapon do you choose?", ["Dagger", "Bow", "Axe"]);
createListQuestion("race", "What is your race?", ["Hume", "Elf", "Orc"]);
createListQuestion("logs", generic, ["Clear Terminal", "Relog", "Clear Logs", "Back"]);

async function getResponse(question) {
    let {decision} = await inquirer.prompt(question);

    return decision;
}

async function prompt(questionName) {
    let response;

    while(!response) response = await getResponse(questions[questionName.toLowerCase()]);

    return response;
}

module.exports = { createListQuestion, createBasicQuestion, createConfirmQuestion, prompt }