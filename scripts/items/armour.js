const {Random} = require("../utils/random");
const {Range} = require("../utils/range");
const utils = require("../utils/utils");
const { Item } = require("./item");

const armour = [
    "Helmet", "Chestplate", "Gauntlets", "Greeves", "Boots"
];

const ranges = {
    helmet: new Range(4, 9),
    chestplate: new Range(8, 15),
    gauntlets: new Range(5, 9),
    greeves: new Range(6, 10),
    boots: new Range(5, 7)
}

class Armour extends Item {
    constructor(name) {
        super(name);

        this.type = utils.capitalize(name);
        this.rating = ranges[this.name.toLowerCase()].random();
    }
}

function generate(item) {
    return new Armour(item);
}

function random() {
    return generate(new Random().fromArray(armour));
}

module.exports = {
    random, generate
}