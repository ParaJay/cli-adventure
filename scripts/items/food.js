const { Random } = require("../utils/random");
const items = require("./item");

class Food extends items.Item {
    constructor(name, health) {
        super(name);

        this.health = health;
    }
}

const berry = new Food("Berry", 5);
const meat = new Food("Meat", 10);

items.register(berry);
items.register(meat);

function getItem(item) {
    return items.lookup[item];
}

function random() {
    return items.random("food");
}

module.exports = {
    berry, meat, getItem, random
}