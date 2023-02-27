const {Event} = require("./events.js");
const armour = require("../items/armour");
const {createListQuestion, prompt} = require("../utils/inq");
const { Random } = require("../utils/random.js");
const logger = require("../utils/logger");
const { player } = require("../player");

const choices = ["Enter", "Leave"];

class HouseEvent extends Event {

    constructor() {
        super("house", null, 4);
        
        this.randomize();
    }

    randomize() {
        this.house = this.generate();
        this.question = this.#createQuestion();

        return this;
    }

    #roomFloorGen(exclusions = []) {
        let random;

        while(random == undefined || exclusions.includes(random)) {
            random = new Random().intFromArray(Object.keys(this.house.floors));
        }

        return random;
    }

    #isConnected(room, floorConnections) {
        for(let i = 0; i < floorConnections.length; i++) {
            if(floorConnections[i].includes(room)) {
                return true;
            }
        }

        return false;
    }

    #getConnections(current = this.currentRoom) {
        let result = [];
        let connections = this.house.connections[this.currentFloor];

        for(let i = 0; i < connections.length; i++) {
            let connection = connections[i];

            if(connection.includes(this.currentRoom)) {
                for(let j = 0; j < connection.length; j++) {
                    let room = connection[j];

                    if(!result.includes(room) && room != this.currentRoom) {
                        result.push(room);
                    }
                }
            }
        }

        return result;
    }

    /*
        TODO: room contents
            Workshop: Weapons
            Store Room: Food
            Laundry: Armour
    */
    //TODO: exclusions so Workshop cannot be connected to Bathroom for example
    generate() {
        this.currentRoom = "Hallway";
        this.currentFloor = "first";

        let floors = {
            lower: ["Basement"],
            first: ["Hallway", "Living Room", "Kitchen"],
            second: ["Hallway", "Main Bedroom", "2nd Bedroom"],
            upper: ["Attic"]
        };

        let connections = {
            lower: [["Basement", "first"]],

            first: [
                ["Hallway", "Living Room"],
                ["Hallway", "lower"],
                ["Hallway", "second"]
            ],

            second: [
                ["Hallway", "Main Bedroom"],
                ["Hallway", "2nd Bedroom"],
                ["Hallway", "first"],
                ["Hallway", "upper"]
            ],
            upper: [["Attic", "second"]]
        }

        let startingRooms = { lower: "Basement", first: "Hallway", second: "Hallway", upper: "Attic" }

        this.house = { floors: floors, connections: connections, startingRooms: startingRooms };

        let floorKeys = Object.keys(floors);

        let bathroomAmountRandom = new Random().nextInt(100);

        if(bathroomAmountRandom <= 30) {
            floors.first.push("Bathroom");
            floors.second.push("Bathroom");
        } else {
            let random = this.#roomFloorGen([0, 3]);
            let floor = floorKeys[random];

            floors[floor].push("Bathroom");
        }

        floors[floorKeys[this.#roomFloorGen()]].push("Workshop");
        floors[floorKeys[this.#roomFloorGen()]].push("Laundry Room");
        floors[floorKeys[this.#roomFloorGen()]].push("Store Room");

        for(let i = 0; i < floorKeys.length; i++) {
            let rooms = floors[floorKeys[i]];
            let floorConnections = connections[floorKeys[i]];
            
            for(let j = 0; j < rooms.length; j++) {
                let room = rooms[j];

                if(!this.#isConnected(room, floorConnections)) {
                    let connection;

                    while(!connection || connection == room) {
                        connection = new Random().fromArray(rooms);
                    }

                    connections[floorKeys[i]].push([room, connection]);
                }
            }
        }

        return { floors: floors, connections: connections, startingRooms: startingRooms };
    }

    async handleInside() {
        let choices = this.#getConnections();

        if(this.currentFloor == "first" && this.currentRoom == "Hallway") {
            choices.push("Leave");
        }

        createListQuestion("room", "Where would you like to go?", choices);

        let decision = await prompt("room");

        if(decision == "Leave") {
            await logger.log("#c:green[you leave the house]");
        } else if("Inspect") {
            //TODO: show contents
        } else {
            if(this.house.floors[decision]) {
                this.currentFloor = decision;
                this.currentRoom = this.house.startingRooms[decision];
            } else {
                this.currentRoom = decision;
            }

            await this.handleInside();
        }
    }

    async handle(response) {
        if(response == "Enter") {
            await this.handleInside();
        } else {
            await player.leave();
        }
    }

    #createQuestion() {       
        return createListQuestion("house", `You find an abandoned house, what do you want to do?`, choices);
    }
}

module.exports = { HouseEvent }