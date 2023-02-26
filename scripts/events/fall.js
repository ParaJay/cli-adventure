const {Event} = require("./events.js");
const {player} = require("../player");
const logger = require("../utils/logger");

class FallEvent extends Event {

    constructor() {
        super("fall", null, 10);
    }

    handle(response) {
        logger.log("you trip on a root and tumble to the ground...ouch");
        player.health -= 10;
    }
}

module.exports = { FallEvent }