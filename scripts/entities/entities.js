const {Random} = require("../utils/random");
const {Range} = require("../utils/range");
const armour = require("../items/armour");
const food = require("../items/food");
const logger = require("../utils/logger");

const entities = [
    "Wolf", "Hume", "Orc", "Elf", "Goblin", "Lion"
];

const unfriendly = ["Lion", "Goblin", "Wolf"];

const healthRanges = {
    wolf: new Range(5, 9),
    hume: new Range(10, 15),
    orc: new Range(12, 17),
    elf: new Range(10, 13),
    goblin: new Range(7, 10),
    lion: new Range(8, 12)
}

const attackRanges = {
    wolf: new Range(3, 6),
    hume: new Range(4, 6),
    orc: new Range(5, 9),
    elf: new Range(4, 7),
    goblin: new Range(2, 5),
    lion: new Range(5, 7)
}

const defenceRanges = {
    wolf: new Range(2, 4),
    hume: new Range(1, 4),
    orc: new Range(3, 5),
    elf: new Range(2, 4),
    goblin: new Range(1, 3),
    lion: new Range(2, 5)
}

class Entity {
    constructor(name) {
        let sh = name.toLowerCase();
        let attack = attackRanges[sh];
        let health = healthRanges[sh];

        this.name = name;
        this.health = health.random();
        this.attack = attack;
        this.defence = defenceRanges[sh].random();
        this.friendly = !unfriendly.includes(this.name);
    }

    async interact(player) {
        let friendlyChance = 0;

        if(player.race == this.name) {
            friendlyChance = 60 + player.luck;
        } else {
            if(this.friendly) {
                friendlyChance = 30 + player.luck;
            }
        }

        let random = new Random().nextInt(100);

        this.friendly = random <= friendlyChance;

        if(this.friendly) {
            //TODO: guide, etc
            let guideRandom = new Random().nextInt(100);
            let itemChance = 10 + player.luck;
            let foodChance = 80 + player.luck;

            if(guideRandom <= itemChance) {
                await player.gift(armour.random());
            } else if(guideRandom > itemChance && guideRandom <= foodChance) {
                let amount = Math.floor((guideRandom / 2) / 10);
                let f = food.random();

                player.addItem(food.random(), amount);

                logger.log("#c:green[" + this.name + " gave you] #c:blue[" + amount + " " + f.name + "]");
            } else {
                logger.log("#c:green[" + this.name + " was] #c:blue[pleased] #c:green[with the encounter and let you on your way]");
            }
        } else {
            logger.log("#c:red[" + this.name + "] #c:green[got] #c:red[angry] #c:green[with the encounter and] #c:red[attacked!]");

            player.fight(this);
        }
    }
}

function generate(entity) {
    return new Entity(entity);
}

function random() {
    return generate(new Random().fromArray(entities));
}

module.exports = { entities, random, generate }