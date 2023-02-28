const inq = require("../scripts/utils/inq");
const inquirer = require("inquirer");

jest.mock("inquirer");

async function testPrompt(prompt, input, output=input) {
    inquirer.prompt = jest.fn().mockResolvedValueOnce({decision: input});

    await expect(inq.prompt(prompt)).resolves.toEqual(output);
}

async function testRejectThrow(input, err) {
    inquirer.prompt = jest.fn().mockResolvedValueOnce({decision: input});

    await expect(inq.prompt("name")).rejects.toThrow(err);
}

describe("test inputs", () => {
    test("expect testPrompt('name', 'Mala ') to return 'Mala'", async () => {
        await testPrompt("name", "Mala ", "Mala");
    });

    test("expect testPrompt('name', '') to be rejected", async () => {
        await testRejectThrow("", TypeError);
    });

    test("expect testPrompt('name', '  ') to be rejected", async () => {
        await testRejectThrow("  ", TypeError);
    });

    test("expect testPrompt('race', '  Orc ') to return 'Orc'", async () => {
        await testPrompt("race", "  Orc", "Orc");
    });
    
    test("expect testPrompt('weapon', 'Axe') to return 'Axe'", async () => {
        await testPrompt("weapon", "Axe");
    });
});