const logs = [];

function log(message) {
    logs.push(message);
    console.log(message);
}

module.exports = {
    logs, log
}