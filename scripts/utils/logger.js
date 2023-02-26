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
    val = val.split("[")[1];
    let toColour = "#c:" + colour + "[" + val + "]";

    let coloured = await ascii.colourText(val, colour);

    return message.replace(toColour, coloured);
}

function relog() {
    for(let i = 0; i < logs.length; i++) {
        logger.log(logs[i], false);
    }
}

function clear() {
    logs.splice(0, logs.length);
}

module.exports = {
    logs, log, relog, clear
}