const food = require("../scripts/items/food");
const {Player} = require("../scripts/player");

function checkEat(item, expectedHealth) {
    let player = new Player();

    player.addItem(item);
    player.eat(item);
    
    expect(player.health).toBe(expectedHealth);
}

describe("check foods", () => {
    test("expect berry not to be null", () => {
        expect(food.berry).not.toBeNull();
    });

    test("expect meat not to be null", () => {
        expect(food.meat).not.toBeNull();
    });

    test("expect berry.health to be 5", () => {
        expect(food.berry.health).toBe(5);
    });

    test("expect meat.health to be 5", () => {
        expect(food.meat.health).toBe(10);
    });
});

describe("check food functionality", () => {
    test("expect player.eat(food.berry) to restore 5 health", () => {
        checkEat(food.berry, 25);
    });

    test("expect player.eat(food.meat) to restore 10 health", () => {
        checkEat(food.meat, 30);
    });
});