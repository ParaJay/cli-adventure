const {generate} = require("../scripts/entities/entities");

function testRange(name, min, max) {
    let range = [];

    for(let i = min; i <= max; i++) range.push(i);

    while(range.length > 0) {
        let attack = generate(name).attack.random();

        expect(attack).toBeGreaterThanOrEqual(min);
        expect(attack).toBeLessThanOrEqual(max);

        range.splice(range.indexOf(attack), 1);
    }
}

describe("entity attack.random() ranges", () => {
    test("expect wolf attack.random() to be >= 3 and <= 6", () => {
        testRange("wolf", 3, 6);
    });

    test("expect hume attack.random() to be >= 4 and <= 6", () => {
        testRange("hume", 4, 6);
    });

    test("expect orc attack.random() to be >= 5 and <= 9", () => {
        testRange("orc", 5, 9);
    });

    test("expect elf attack.random() to be >= 4 and <= 7", () => {
        testRange("elf", 4, 7);
    });

    test("expect goblin attack.random() to be >= 2 and <= 5", () => {
        testRange("goblin", 2, 5);
    });

    test("expect lion attack.random() to be >= 5 and <= 7", () => {
        testRange("lion", 5, 7);
    });
});