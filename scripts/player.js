const {Random} = require("./utils/random");
const events = require("./events/events");
const {prompt} = require("./utils/inq");
const {berry} = require("./items/food");
const {journal} = require("./journal");
const logger = require("./utils/logger")
const {Inventory} = require("./items/inventory");
const { ranges, weaponRace } = require("./utils/consts");

const equipmentList = ["Helmet", "Chestplate", "Gauntlets", "Greeves", "Boots"];

class Player {
    constructor() {
        this.name = "";
        this.race = "";
        this.weapon = "";
        this.health = 20;
        this.equipment = [undefined, undefined, undefined, undefined, undefined];
        this.inventory = new Inventory();
        this.luck = 0;
    }

    init() {
        let sh = this.race.toLowerCase();
        let wlc = this.weapon.toLowerCase();

        this.health = ranges.playerHealth[sh].random();
        this.attack = ranges.weapons[wlc];
        this.defence = ranges.defence[sh].random();

        if(weaponRace[wlc] == sh) {
            this.attack.min *= 1.2;
            this.attack.max *= 1.2;
        }
    }

    equip(item) {
        let index = equipmentList.indexOf(item.type);

        let equipped = this.equipment[index];

        if(equipped) this.defence -= equipped.rating;

        this.equipment[index] = item;

        this.defence += item.rating;
    }

    getDamage() {
        return this.attack.random();
    }

    #attack(a, b) {
        let damage = a.attack.random();
        let att = Math.round(damage - (b.defence / damage));

        b.health -= att;

        return att;
    }

    async fight(entity) {
        let turn = new Random().nextInt(100) <= 50 ? 0 : 1;

        while(this.health > 0 && entity.health > 0) {
            if(turn == 0) {
                let attack = this.#attack(this, entity);

                await logger.log("#c:green[you] #c:blue[struck] #c:red[" + entity.name + "] #c:green[and did] #c:blue[" + attack + " damage]");
            } else {
                let attack = this.#attack(entity, this);

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
        return this.inventory.hasItem(item);
    }

    addItem(item, amount=1) {
        this.inventory.addItem(item, amount);
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
        this[key] = await eval(`prompt('${key}');`);
    }
}

const player = new Player();

module.exports = { player, Player }