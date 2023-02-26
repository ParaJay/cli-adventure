const entities = require("../scripts/entities/entities");
const {journal} = require("../scripts/journal");

describe("test journal functions", () => {
    test("expect journal.hasEntries to be true", () => {
        let entity = entities.random();

        journal.addEntry(entity);

        expect(journal.hasEntries()).toBe(true);
    });
    
    test("test advanced journal info", () => {
        for(let i = 0; i < 5; i++) {
            journal.addEntry(entities.generate("Goblin"));
        }

        console.log(journal.getEntry("Goblin"));
    })
});