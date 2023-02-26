const {Event} = require("./events.js");
const {player} = require("../player");
const logger = require("../utils/logger");

class FallEvent extends Event {

    constructor() {
        super("fall", null, 10);
    }

    async handle(response) {
        await logger.log("#c:green[you] #c:blue[trip] #c:green[on a] #c:blue[root] #c:green[and] #c:blue[tumble] #c:green[to the] #c:blue[ground]#c:blue[...]#c:red[ouch]");
        player.health -= 10;
    }
}

module.exports = { FallEvent }