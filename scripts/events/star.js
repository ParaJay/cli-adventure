const {Event} = require("./events.js");
const {player} = require("../player");
const logger = require("../utils/logger");

class StarEvent extends Event {

    constructor() {
        super("star", null, 5);
    }

    async handle(response) {
        await logger.log("#c:green[you look up at the] #c:blue[night sky] #c:green[and see a] #c:blue[shooting star]#c:green[, you feel] #c:blue[inspired]");
        player.health += 20;
        player.luck += 20;
    }
}

module.exports = { StarEvent }