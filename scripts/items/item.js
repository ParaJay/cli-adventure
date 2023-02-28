const { Random } = require("../utils/random");

const names = {};
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

    randomize() { return this };
}

function random(...itemTypes) {
    let full = [];

    for(let i = 0; i < itemTypes.length; i++) {
        let type = itemTypes[i];

        if(types[type]) {
            full = full.concat(types[type]);
        }
    }

    return new Random().fromArray(full).randomize();
}

function lookup(name) {
    return names[name.toLowerCase()];
}

function register(item) {
    names[item.name.toLowerCase()] = item;

    let typ = types[item.getType().toLowerCase()];
    let registeredTypes = typ ? typ : [];

    registeredTypes.push(item);

    types[item.getType().toLowerCase()] = registeredTypes;

    console.log("registered: " + item.name);
}

module.exports = {
    Item, register, lookup, random
}