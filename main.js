//TODO: have player.x and player.y
//TODO: on interact, store an event.x and event.y
//TODO if move and pos == event.pos, play event
//TODO ie: player.interact(Elf) = Elf tells you of a chest to the NW, if pos == event.pos, play ChestEvent

const { prompt, createListQuestion } = require("./scripts/utils/inq");
const events = require("./scripts/events/events");
const { player } = require("./scripts/player");
const utils = require("./scripts/utils/utils.js");
const { berry, meat, getItem } = require("./scripts/items/food");
const {journal} = require("./scripts/journal");
const ascii = require("./scripts/utils/ascii");

const logger = require("./scripts/utils/logger");

const { FindEvent } = require("./scripts/events/find");
const { StarEvent } = require("./scripts/events/star");
const { EncounterEvent } = require("./scripts/events/encounter");
const { FallEvent } = require("./scripts/events/fall");
const { WatchedEvent } = require("./scripts/events/watched");
const { HouseEvent } = require("./scripts/events/house");
const { BeggarEvent } = require("./scripts/events/begger");

const args = { "scriptDelay": 800, "scriptOutput": true, "animationDelay": 200 };

function initEvents() {
    events.register(new EncounterEvent());
    events.register(new FindEvent());
    events.register(new StarEvent());
    events.register(new FallEvent());
    events.register(new WatchedEvent());
    events.register(new HouseEvent());
    events.register(new BeggarEvent());
}

async function handle(decision) {
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
        
            await logger.log("#c:green[" + (await journal.getEntry(entry)) + "]");
        } else {
            await logger.log("#c:red[Journal has no entries]");
        }
    } else if(decision == "Action") {
        decision = await prompt("action");
        if(decision == "Eat") {
            let answers = [];
    
            if(player.inventory.hasItem(berry)) answers.push("Berry");
            if(player.inventory.hasItem(meat)) answers.push("Meat");
    
            if(answers.length > 0) {
                createListQuestion("eat", "what would you like to eat", answers);
    
                let food = await prompt("eat");
    
                await player.eat(getItem(food));
            } else {
                await logger.log("#c:red[you don't have any food]");
            }
        } else {
            await eval(`player.action("${decision.toLowerCase()}");`);
        }
    } else if(decision == "Logs") {
        let logDecision = await prompt("logs");

        if(logDecision == "Clear Terminal") {
            console.clear();
        } else if(logDecision == "Relog") {
            await logger.relog();
        } else if(logDecision == "Clear Logs") {
            logger.clear();
        }
    }else {
        await eval(`player.${decision.toLowerCase()}();`);
    }
}

async function main() {
    if(player.health <= 0) {
        await logger.log("#c:red[you died :(]");
        return;
    }

    let decision = await prompt("main");

    await handle(decision);

    main();
}

function processArguments() {
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
    initEvents();
    processArguments();

    await ascii.animateText("CLI Adventure", [
        "red", "green", "blue", "yellow", "cyan", "magenta"
    ], args.animationDelay);

    await utils.runScript(player, "set", ["",
        "#c:green[you] #c:blue[awake] #c:green[in an unfamiliar place]", "#c:green[dazed, your memory starts to fade...]", "#c:green[you must remember...]",
        "prompt;name", "prompt;race",
        "#c:green[you find a] #c:blue[bag] #c:green[on the floor, inside is a] #c:blue[dagger], #c:green[a] #c:blue[bow] #c:green[and an] #c:blue[axe]",
        "prompt;weapon",
        "#c:green[you must find a way]"
    ], args.scriptDelay, args.scriptOutput);

    player.init();

    main();
}

init();