const {Event} = require("./events.js");
const entities = require("../entities/entities");
const {createListQuestion} = require("../utils/inq");
const {player} = require("../player");

const choices = ["Fight", "Interact", "Flee"];

class EncounterEvent extends Event {

    constructor() {
        super("encounter", null, 7);

        this.randomize();
    }

    randomize() {
        this.question = this.#createEncounterQuestion();

        return this;
    }

    async handle(response) {
        await eval(`player.${response.toLowerCase()}(this.entity);`);
    }

    #createEncounterQuestion() {
        this.entity = entities.random();
        
        return createListQuestion("encounter", `You encountered a ${this.entity.name}, what do you want to do?`, choices);
    }
}

module.exports = { EncounterEvent }