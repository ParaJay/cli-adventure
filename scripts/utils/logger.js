const logs = [];

function log(message) {
    logs.push(message);
    console.log(message);
}

function relog() {
    for(let i = 0; i < logs.length; i++) {
        console.log(logs[i]);
    }
}

function clear() {
    logs.splice(0, logs.length);
}

module.exports = {
    logs, log, relog, clear
}