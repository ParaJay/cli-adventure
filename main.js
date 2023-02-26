//TODO: have player.x and player.y
//TODO: on interact, store an event.x and event.y
//TODO if move and pos == event.pos, play event
//TODO ie: player.interact(Elf) = Elf tells you of a chest to the NW, if pos == event.pos, play ChestEvent

const { prompt, createListQuestion } = require("./scripts/utils/inq");
const events = require("./scripts/events/events");
const { player, initPlayer } = require("./scripts/player");
const utils = require("./scripts/utils/utils.js");
const { berry, meat, initFood, getItem } = require("./scripts/items/food");
const {journal} = require("./scripts/journal");
const ascii = require("./scripts/utils/ascii");

const logger = require("./scripts/utils/logger");

const { FindEvent } = require("./scripts/events/find");
const { StarEvent } = require("./scripts/events/star");
const { EncounterEvent } = require("./scripts/events/encounter");
const { FallEvent } = require("./scripts/events/fall");
const { WatchedEvent } = require("./scripts/events/watched");

const args = { "scriptDelay": 800, "scriptOutput": true };

function initEvents() {
    events.register(new EncounterEvent());
    events.register(new FindEvent());
    events.register(new StarEvent());
    events.register(new FallEvent());
    events.register(new WatchedEvent());
}

async function main() {
    if(player.health <= 0) {
        logger.log("you died :(");
        return;
    }

    let decision = await prompt("action");

    if(decision == "Exit") {
        let exit = await prompt("exit");

        if(exit == "Yes") return;
    } else if(decision == "Move") {
        let direction = await prompt("move");

        await player.move(direction);
    } else if(decision == "Journal") {
        if(journal.hasEntries()) {
            journal.createQuestion();

            let entry = await prompt("journal");
        
            logger.log(journal.getEntry(entry));
        } else {
            logger.log("Journal has no entries");
        }
    } else if(decision == "Eat") {
        let answers = [];

        if(player.hasItem(berry)) answers.push("Berry");
        if(player.hasItem(meat)) answers.push("Meat");

        if(answers.length > 0) {
            createListQuestion("eat", "what would you like to eat", answers);

            let food = await prompt("eat");

            player.eat(getItem(food));
        } else {
            logger.log("you don't have any food");
        }
    }  else {
        await eval(`player.${decision.toLowerCase()}();`);
    }

    main();
}

function processArguments() {
    // let nodeArgs = process.execArgv;

    process.argv.slice(2).forEach((val, index, array) => {
        let normal = val.replace("--", "");
        let split = normal.split("=");
        let key = split[0];
        let reform = utils.capitalizeArray(key.split("-"), 1);

        if(split.length == 2) args[reform] = split[1];
    });

    return;
}

async function init() {
    initFood();
    initPlayer();
    initEvents();
    processArguments();

    await ascii.writeText("CLI Adventure");
    // await ascii.drawImage("fb.png");

    await utils.runScript(player, "set", ["",
        "you awake in an unfamiliar place", "dazed, your memory starts to fade...", "you must remember...",
        "prompt;name", "prompt;race",
        "you find a bag on the floor, inside is a dagger, a bow and an axe",
        "prompt;weapon",
        "you must find a way"
    ], args.scriptDelay, args.scriptOutput);

    player.init();

    main();
}

init();