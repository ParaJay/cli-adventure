const entities = require("../scripts/entities/entities");
const {journal} = require("../scripts/journal");

async function testAdvanced(entity) {
    for(let i = 0; i < 5; i++) {
        await journal.addEntry(entities.generate(entity));
    }

    console.log(await journal.getEntry(entity));
}

describe("test journal functions", () => {
    test("expect journal.hasEntries to be true", async () => {
        let entity = entities.random();

        await journal.addEntry(entity);

        expect(journal.hasEntries()).toBe(true);
    });
});

describe("test journal advanced info", () => {
    test("test goblin info", async() => {
        await testAdvanced("Goblin");
    });

    test("test orc info", async() => {
        await testAdvanced("orc");
    });

    test("test elf info", async() => {
        await testAdvanced("elf");
    });

    test("test wolf info", async() => {
        await testAdvanced("wolf");
    });

    test("test lion info", async() => {
        await testAdvanced("lion");
    });

    test("test hume info", async() => {
        await testAdvanced("hume");
    });
});