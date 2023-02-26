const { Random } = require("../utils/random");

class Food {
    constructor(name, health) {
        this.name = name;
        this.health = health;
    }
}

const berry = new Food("Berry", 5)
const meat = new Food("Meat", 10);

const lookup = {
    "Berry": berry,
    "Meat": meat
}

function getItem(item) {
    return lookup[item];
}

function random() {
    return lookup[new Random().fromArray(Object.keys(lookup))];
}

module.exports = {
    berry, meat, getItem, lookup, random
}