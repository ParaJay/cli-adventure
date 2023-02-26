const {createListQuestion} = require("./utils/inq");
const {capitalize} = require("./utils/utils");
const logger = require("./utils/logger");

const info = {
    "goblin": {
        basic: "Goblins are a mean-spirited race of beings. Any interaction with them ends in bloodshed",
        advanced: ["Health: 7-10", "Attack: 2-5"]
    },

    "wolf": {
        basic: "Wild Wolves are quick, agile and very aggressive.",
        advanced: ["Health: 5-9", "Attack: 3-6"]
    },

    "lion": {
        basic: "Lions are extremely strong and very aggressive.",
        advanced: ["Health: 8-12", "Attack: 5-7"]
    },

    "hume": {
        basic: "Hume",
        advanced: ["Health: 10-15", "Attack: 4-6"]
    },

    "elf": {
        basic: "Master sharpshooters, extremely proficient with a bow.",
        advanced: ["Health: 10-13", "Attack: 4-7"]
    },

    "orc": {
        basic: "Strong brutish beings. Extremely proficient with an axe, can hold two-handed weapons in one hand.",
        advanced: ["Health: 12-17", "Attack: 5-9"]
    }
}

class Journal {
    constructor() {
        this.entries = {};
    }

    hasEntries() {
        let keys = Object.keys(this.entries);

        for(let i = 0; i < keys.length; i++) {
            if(this.entries[keys[i]] > 0) {
                return true;
             }
        }

        return false;
    }

    addEntry(entity) {
        let key = entity.name.toLowerCase();
        let value = this.entries[key];
        
        if(!value) value = 0;

        value++;

        if(value == 1) {
            logger.log("Added journal entry: " + entity.name);
        }

        if(value == 5) {
            logger.log("Updated journal entry: " + entity.name);
        }

        this.entries[key] = value;
    }

    getEntry(entity) {
        let key = entity.toLowerCase();
        let value = info[key];
        let result;

        if(this.entries[key] > 0) {
            result = value.basic;
        }

        if(this.entries[key] >= 5) {
            result += "\n" + value.advanced.toString().replaceAll(",", "\n");
        }

        return result;
    }

    createQuestion() {
        if(this.hasEntries()) {
            let choices = [];

            Object.keys(this.entries).forEach(e => {
                choices.push(capitalize(e));
            });

            createListQuestion("journal", "What entry would you like to view?", choices);
        }
    }
}

const journal = new Journal();

module.exports = {
    journal
}