const { ranges } = require("../utils/consts");
const items = require("./item");

class Weapon extends items.Item {
    constructor(name) {
        super(name);

        this.type = name.toLowerCase();
        this.attack = ranges.weapons[this.type];
        this.rating = this.attack.mid;
    }

    getDamage() {
        return this.attack.random();
    }
}

const axe = new Weapon("Axe");
const bow = new Weapon("Bow");
const dagger = new Weapon("Dagger");

items.register(axe);
items.register(bow);
items.register(dagger);

function random() {
    return items.random("weapon");
}

module.exports = {
    random, Weapon
}