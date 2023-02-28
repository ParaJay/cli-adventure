const { Range } = require("./range");

const five9 = new Range(5, 9);
const two4 = new Range(2, 4);
const two5 = new Range(2, 5);

const ranges = {
    entityHealth: {
        wolf: five9,
        hume: new Range(10, 15),
        orc: new Range(12, 17),
        elf: new Range(10, 13),
        goblin: new Range(7, 10),
        lion: new Range(8, 12)
    },

    attack: {
        wolf: new Range(3, 6),
        hume: new Range(4, 6),
        orc: five9,
        elf: new Range(4, 7),
        goblin: two5,
        lion: new Range(5, 7)
    },

    defence: {
        wolf: two4,
        hume: new Range(1, 4),
        orc: new Range(3, 5),
        elf: two4,
        goblin: new Range(1, 3),
        lion: two5
    },

    weapons: {
        dagger: two5,
        bow: new Range(3, 6),
        axe: new Range(4, 8)
    },

    playerHealth: {
        hume: new Range(10, 16),
        orc: new Range(15, 22),
        elf: new Range(12, 15)
    }
}

const weaponRace = {
    dagger: "hume",
    bow: "elf",
    axe: "orc"
}

module.exports = {
    ranges, weaponRace
}