const {Random} = require("../utils/random");
const utils = require("../utils/utils");
const items = require("./item");
const { ranges } = require("../utils/consts");

const armour = ["Helmet", "Chestplate", "Gauntlets", "Greeves", "Boots"];
class Armour extends items.Item {
    constructor(name) {
        super(name);

        this.type = utils.capitalize(name);
       
        this.randomize();
    }

    randomize() { 
        this.rating = ranges.armour[this.name.toLowerCase()].random();
        
        return this;
     };
}

function generate(item) {
    return new Armour(item);
}

for(let i = 0; i < armour.length; i++) {
    items.register(new Armour(armour[i]));
}

function random() {
    return items.random("armour");
}

module.exports = {
    random, generate, armour
}