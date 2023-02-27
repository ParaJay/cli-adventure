const items = require("../scripts/items/armour");
const player = require("../scripts/player");

function testRange(name, min, max) {
    let range = [];

    for(let i = min; i <= max; i++) {
        range.push(i);
    }

    while(range.length > 0) {
        let rating = items.generate(name).rating;

        expect(rating).toBeGreaterThanOrEqual(min);
        expect(rating).toBeLessThanOrEqual(max);

        range.splice(range.indexOf(rating), 1);
    }
}

describe("check item functions", () => {
    test("expect items.random() not to be null", () => {
        expect(items.random()).not.toBeNull();
    });

    test("expect items.generate('Boots') to have rating between 4-9", () => {
        testRange("Boots", 4, 9);
    });

    test("expect items.generate('Chestplate') to have rating between 8-15", () => {
        testRange("Chestplate", 8, 15);
    });

    test("expect items.generate('Gauntlets') to have rating between 5-9", () => {
        testRange("Gauntlets", 5, 9);
    });

    test("expect items.generate('Greeves') to have rating between 6-10", () => {
        testRange("Greeves", 6, 10);
    });

    test("expect items.generate('Boots') to have rating between 5-7", () => {
        testRange("Boots", 5, 7);
    });
});