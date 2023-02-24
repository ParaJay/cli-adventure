const {Random} = require("../utils/random");
const {Range} = require("../utils/range");

const items = [
    "Helmet", "Chestplate", "Gauntlets", "Greeves", "Boots"
];

const ranges = {
    helmet: new Range(4, 9),
    chestplate: new Range(8, 15),
    gauntlets: new Range(5, 9),
    greeves: new Range(6, 10),
    boots: new Range(5, 7)
}

class Item {
    constructor(name) {
        this.name = name;
        this.rating = ranges[this.name.toLowerCase()].random();
    }
}

function generate(item) {
    return new Item(item);
}

function random() {
    return generate(new Random().fromArray(items));
}

module.exports = {
    random, generate
}