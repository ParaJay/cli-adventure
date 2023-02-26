const {Event} = require("./events.js");
const items = require("../items/items");
const {createListQuestion} = require("../utils/inq");

const choices = ["Equip", "Leave"];

class GiftEvent extends Event {

    constructor(item) {
        super("gift", null, 0);

        this.item = item;
        
        this.question = this.#createGiftQuestion();
    }

    async handle(response) {
        await eval(`const {player} = require("../player"); player.${response.toLowerCase()}(this.found);`);
    }

    #createGiftQuestion() {       
        return createListQuestion("gift", `You were gifted a ${this.item.name} with a rating of ${this.item.rating}, what do you want to do?`, choices);
    }
}

module.exports = { GiftEvent }