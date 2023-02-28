const {Event} = require("./events.js");
const armour = require("../items/armour");
const {createListQuestion} = require("../utils/inq");
const {player} = require("../player");
const items = require("../items/item");

const choices = ["Equip", "Leave"];

class FindEvent extends Event {

    constructor() {
        super("find", null, 7);
    }

    getWeight() {
        return this.weight + player.luck;
    }

    randomize() {
        this.question = this.#createFindQuestion();

        return this;
    }

    async handle(response) {
        await eval(`player.${response.toLowerCase()}(this.found);`);
    }

    #createFindQuestion() {
        this.found = items.random("armour", "weapon");
        
        return createListQuestion("find", `You found a ${this.found.name} with a rating of ${this.found.rating}, what do you want to do?`, choices);
    }
}

module.exports = { FindEvent }