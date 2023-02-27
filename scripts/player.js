const {Random} = require("./utils/random");
const {Range} = require("./utils/range");
const events = require("./events/events");
const {prompt} = require("./utils/inq");
const {berry, lookup} = require("./items/food");
const {journal} = require("./journal");
const logger = require("./utils/logger")

const healthRanges = {
    hume: new Range(10, 16),
    orc: new Range(15, 22),
    elf: new Range(12, 15),
}

const weaponRanges = {
    dagger: new Range(2, 5),
    bow: new Range(3, 6),
    axe: new Range(4, 8)
}

const weaponRace = {
    dagger: "hume",
    bow: "elf",
    axe: "orc"
}

const equipmentList = ["Helmet", "Chestplate", "Gauntlets", "Greeves", "Boots"];

class Player {
    constructor() {
        this.name = "";
        this.race = "";
        this.weapon = "";
        this.health = 20;
        this.equipment = [];
        this.items = {};
        this.luck = 0;
    }

    init() {
        let sh = this.race.toLowerCase();
        let wlc = this.weapon.toLowerCase();

        this.health = healthRanges[sh].random();
        this.attack = weaponRanges[wlc];

        if(weaponRace[wlc] == sh) {
            this.attack.min *= 1.2;
            this.attack.max *= 1.2;
        }
    }

    equip(item) {
        let index = equipmentList.indexOf(item.type);

        let equipped = this.equipment[index];

        if(equipped) {
            this.health -= equipped.rating;
        }

        this.equipment[index] = item;

        this.health += item.rating;
    }

    getDamage() {
        return this.attack.random();
    }

    async fight(entity) {
        let turn = new Random().nextInt(100) <= 50 ? 0 : 1;

        while(this.health > 0 && entity.health > 0) {
            if(turn == 0) {
                let attack = this.getDamage();

                entity.health -= attack;

                await logger.log("#c:green[you] #c:blue[struck] #c:red[" + entity.name + "] #c:green[and did] #c:blue[" + attack + " damage]");
            } else {
                let attack = entity.attack.random();

                this.health -= attack;

                await logger.log("#c:red[" + entity.name + "] #c:blue[struck] #c:green[you and did] #c:blue[" + attack + " damage]");
            }

            turn = turn == 0 ? 1 : 0;
        }

        if(entity.health <= 0) {
            await logger.log("#c:green[you] #c:blue[killed] #c:green[the] #c:red[" + entity.name + "]");

            await journal.addEntry(entity);
        }
    }

    async interact(entity) {
        await entity.interact(this);
    }

    async flee(entity) {
        let random = new Random().nextInt(100);

        if(random <= 40 + this.luck) {
            await logger.log("#c:green[you ran away]");
        } else {
            await logger.log("#c:green[you] #c:red[failed] #c:green[to ran away,] #c:red[" + entity.name + "] #c:green[is] #c:red[attacking!]");

            await this.fight(entity);
        }
    }

    async leave() {
        await logger.log("#c:green[you walk away]");
    }

    async rest() {
        this.health += new Random().randint(4, 8);
        await logger.log("#c:green[you rest up]");

        await this.postAction();
    }

    async eat(item) {
        if(this.hasItem(item)) {
            this.addItem(item, -1);

            await logger.log("#c:green[you ate:] #c:blue[" + item.name + "]");

            this.health += item.health;
        }

        //TODO: random event for food poisoning
    }

    hasItem(item) {
        let amount = this.items[item.name];

        if(amount && amount > 0) return true;

        return false;
    }

    addItem(item, amount=1) {
        let owned = this.items[item.name];
        let currentAmount = this.hasItem(item) ? owned : 0;

        this.items[item.name] = amount + currentAmount;
    }

    async gift(item) {
        let {GiftEvent} = require("./events/gift");

        new GiftEvent(item);

        await prompt("gift");
    }

    async forage() {
        let fail = 20;

        if(this.race == "Elf") fail = 10;

        let r = new Random().nextInt(100);

        if(r <= fail) {
            await logger.log("#c:red[failed to find anything]");
        } else {
            let amount = Math.floor((r / 2) / 10);

            this.addItem(berry, amount);

            await logger.log(`#c:green[you found] #c:blue[${amount} berries]`);
        }

        await this.postAction();
    }

    stats() {
        console.table({ player: this });
    }

    async move(direction) {
        await logger.log(`#c:green[you moved:] #c:blue[${direction}]`);

        await this.postAction();
    }

    async postAction() {
        let r = new Random().nextInt(100);

        if(r <= 40) {
            let event = events.random();
            let decision;

            if(event.question) decision = await prompt(event.name);

            await event.handle(decision);
        }
    }

    async set(key) {
        let val = await eval(`prompt('${key}');`);
    
        this[key] = val;
    }
}

const player = new Player();

module.exports = { player, Player }