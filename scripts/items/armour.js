const {Random} = require("../utils/random");
const utils = require("../utils/utils");
const { Item } = require("./item");
const { ranges } = require("../utils/consts");

const armour = ["Helmet", "Chestplate", "Gauntlets", "Greeves", "Boots"];
class Armour extends Item {
    constructor(name) {
        super(name);

        this.type = utils.capitalize(name);
        this.rating = ranges.armour[this.name.toLowerCase()].random();
    }
}

function generate(item) {
    return new Armour(item);
}

function random() {
    return generate(new Random().fromArray(armour));
}

module.exports = {
    random, generate, armour
}