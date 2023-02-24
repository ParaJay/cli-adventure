const {prompt} = require("./inq");

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runScript(promptMain, promptFunc, script, delay=800, output=true) {
    for(let i = 0; i < script.length; i++) {
        let e = script[i];

        if(e.includes("prompt;")) {
            let prompter = !promptMain ? "" : "promptMain.";

            if(!promptFunc) promptFunc = "prompt";

            await eval(`${prompter}${promptFunc}(e.replace("prompt;", ""))`);
        } else {
            if(output == true) {
                console.log(e); 
            } else {
                continue;
            }
        }

        await sleep(delay);
    }
}

function capitalize(string) {
    return (string.charAt(0).toUpperCase() + string.slice(1));
}

function capitalizeArray(array, start=0, seperator="") {
    let result = "";

    if(start != 0) result = array.slice(0, start).toString().replaceAll(",", seperator);

    for(let i = start; i < array.length; i++) {
        let e = array[i];

        if(result.length > 0) result += seperator;

        result += capitalize(e);
    }

    return result;
}

module.exports = { sleep, runScript, capitalize, capitalizeArray }