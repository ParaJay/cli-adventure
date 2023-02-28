const { Random } = require("../utils/random");

const lookup = {};
const types = {};

class Item {
    constructor(name) {
        this.name = name;
    }

    getType() { return this.constructor.name };

    isFood() { return getType() == "Food";  }

    isArmour() { return getType() == "Armour"; }

    isWeapon() { return getType() == "Weapon"; }

    isMisc() { return getType() == "Misc"; }
}

function random(type) {
    return new Random().fromArray(types[type]);
}

function register(item) {
    lookup[item.name] = item;

    let typ = types[item.getType().toLowerCase()];
    let registeredTypes = typ ? typ : [];

    registeredTypes.push(item);

    types[item.getType().toLowerCase()] = registeredTypes;
}

module.exports = {
    Item, register, lookup, random
}