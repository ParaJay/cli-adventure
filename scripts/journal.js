const {createListQuestion} = require("./utils/inq");
const utils = require("./utils/utils");
const logger = require("./utils/logger");
const images = require("./utils/images");

const info = {
    "goblin": {
        basic: "Goblins are a mean-spirited race of beings. Any interaction with them ends in bloodshed",
        advanced: ["Health: 7-10", "Attack: 2-5", "Defence: 1-3"]
    },

    "wolf": {
        basic: "Wild Wolves are quick, agile and very aggressive.",
        advanced: ["Health: 5-9", "Attack: 3-6", "Defence: 2-4"]
    },

    "lion": {
        basic: "Lions are extremely strong and very aggressive.",
        advanced: ["Health: 8-12", "Attack: 5-7", "Defence: 2-5"]
    },

    "hume": {
        basic: "Hume",
        advanced: ["Health: 10-15", "Attack: 4-6", "Defence: 1-4"]
    },

    "elf": {
        basic: "Master sharpshooters, extremely proficient with a bow.",
        advanced: ["Health: 10-13", "Attack: 4-7", "Defence: 2-4"]
    },

    "orc": {
        basic: "Strong brutish beings. Extremely proficient with an axe, can hold two-handed weapons in one hand.",
        advanced: ["Health: 12-17", "Attack: 5-9", "Defence: 3-5"]
    }
}

class Journal {
    constructor() {
        this.entries = {};
    }

    hasEntries() {
        return Object.keys(this.entries).filter(e => this.entries[e] > 0).length > 0;
    }

    async addEntry(entity) {
        let key = entity.name.toLowerCase();
        let value = this.entries[key];
        
        if(!value) value = 0;

        value++;

        let text;

        if(value == 1) text = "Added";
        if(value == 5) text = "Updated";

        if(text) await logger.log(`#c:green[${text} journal entry:] #c:blue[${entity.name}]`);

        this.entries[key] = value;
    }

    async getEntry(entity) {
        let key = entity.toLowerCase();
        let value = info[key];
        let result;

        if(this.entries[key] > 0) {
            result = value.basic;
        }

        if(this.entries[key] >= 5) {
            result += "\n" + value.advanced.toString().replaceAll(",", "\n");

            console.log(await images.getImage(key));
        }

        return result;
    }

    createQuestion() {
        if(this.hasEntries()) {
            let choices = [];

            Object.keys(this.entries).forEach(e => choices.push(utils.capitalize(e)));

            createListQuestion("journal", "What entry would you like to view?", choices);
        }
    }
}

const journal = new Journal();

module.exports = {
    journal
}