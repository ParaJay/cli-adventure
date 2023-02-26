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

module.exports = {
    logs, log, relog
}