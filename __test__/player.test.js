const entities = require("../scripts/entities/entities");
const {Player} = require("../scripts/player");

test("fight function", () => {
    let player = new Player();
    player.weapon = "Axe";
    player.race = "Orc";
    player.init();
    let entity = entities.random();

    player.fight(entity);
});