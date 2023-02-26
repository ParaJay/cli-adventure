const {Event} = require("./events.js");
const {player} = require("../player");
const logger = require("../utils/logger");

class WatchedEvent extends Event {

    constructor() {
        super("star", null, 5);
    }

    async handle(response) {
        await logger.log("#c:green[a] #c:blue[strange feeling] #c:green[befalls you...almost as if you're being] #c:blue[watched] #c:green[from afar...]");
        player.luck -= 20;
    }
}

module.exports = { WatchedEvent }