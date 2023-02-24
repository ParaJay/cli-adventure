const {Event} = require("./events.js");
const {player} = require("../player");

class WatchedEvent extends Event {

    constructor() {
        super("star", null, 5);
    }

    handle(response) {
        console.log("a strange feeling befalls you...almost as if you're being watched from afar...");
        player.luck -= 20;
    }
}

module.exports = { WatchedEvent }