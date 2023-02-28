const {Event} = require("./events.js");
const armour = require("../items/armour");
const {createConfirmQuestion, prompt} = require("../utils/inq");
const {player} = require("../player");
const food = require("../items/food");
const { Random } = require("../utils/random.js");
const logger = require("../utils/logger");
const { GiftEvent } = require("./gift.js");
const items = require("../items/item");

class BeggarEvent extends Event {

    constructor() {
        super("beggar", null, 3);

        this.randomize();
    }

    randomize() {
        this.item = food.random();
        this.amount = new Random().randint(2, 5);
        this.question = this.#createQuestion();

        return this;
    }

    async handle(response) {
        if(response == "Yes") {
            if(player.inventory.count(this.item) >= this.amount) {
                player.inventory.addItem(this.item, -this.amount);
                
                await logger.log("#c:blue[the beggar thanks you for your generosity]");

                new GiftEvent(items.random("armour", "weapon"));

                await prompt("gift");
            } else {
                await logger.log("#c:red[you don't have enough of] #c:blue[" + this.item.name + "]");
                await this.handle("No");
            }
        } else {
            await logger.log("#c:blue[The beggar walks away...]");
        }
    }

    #createQuestion() {       
        return createConfirmQuestion("beggar", `A beggar approaches you asking for ${this.amount} ${this.item.name}, will you fulfill the request`);
    }
}

module.exports = { BeggarEvent }