const {Event} = require("./events.js");
const {player} = require("../player");

class FallEvent extends Event {

    constructor() {
        super("fall", null, 10);
    }

    handle(response) {
        console.log("you trip on a root and tumble to the ground...ouch");
        player.health -= 10;
    }
}

module.exports = { FallEvent }