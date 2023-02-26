const {Event} = require("./events.js");
const {player} = require("../player");
const logger = require("../utils/logger");

class StarEvent extends Event {

    constructor() {
        super("star", null, 5);
    }

    handle(response) {
        logger.log("you look up at the night sky and see a shooting star, you feel inspired");
        player.health += 20;
        player.luck += 20;
    }
}

module.exports = { StarEvent }