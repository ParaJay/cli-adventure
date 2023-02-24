const {Random} = require("../utils/random");

const events = [];

class Event {
    constructor(name, question, weight) {
        this.name = name;
        this.question = question;
        this.weight = weight;
        this.lucky = false;
    }

    getWeight() {
        return this.weight;
    }

    handle(response) { }

    randomize() { return this; }
}

function random() {
    let size = 0;

    for(let i = 0; i < events.length; i++) {
        let event = events[i];

        size += event.getWeight();
    }

    let random = new Random().nextInt(size);
    let probability = 0;

    for(let i = 0; i < events.length; i++) {
        let event = events[i];

        probability += event.weight;

        if(random <= probability) {
            return event.randomize();
        }
    }
    
    return events[0].randomize();
}

function register(event) { events.push(event) };

module.exports = { random, register, Event }