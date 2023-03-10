const logs = [];

async function log(message, push=true) {
    if(push) logs.push(message);

    while(message.includes("#c:")) {
        message = await tryColour(message);
    }

    console.log(message);
}

async function tryColour(message) {
    let ascii = require("./ascii");

    let split = message.split("#c:");
    let val = split[1].split("]")[0];
    let colour = val.split("[")[0];
    let text = val.split("[")[1];
    let toColour = "#c:" + colour + "[" + text + "]";

    let coloured = await ascii.colourText(text, colour);

    return message.replace(toColour, coloured);
}

async function relog() {
    for(let i = 0; i < logs.length; i++) {
        await log(logs[i], false);
    }
}

function clear() {
    logs.splice(0, logs.length);
}

module.exports = {
    logs, log, relog, clear
}