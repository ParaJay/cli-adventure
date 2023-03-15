const entities = require("../scripts/entities/entities");
const {Player} = require("../scripts/player");
const weapons = require("../scripts/items/weapon");

test("fight function", async() => {
    let player = new Player();
    player.weapon = "Axe";
    player.race = "Orc";
    player.init();
    let entity = entities.random();

    await player.fight(entity);
});