const {Random} = require("./utils/random");
const events = require("./events/events");
const {prompt} = require("./utils/inq");
const {berry} = require("./items/food");
const {journal} = require("./journal");
const logger = require("./utils/logger")
const {Inventory} = require("./items/inventory");
const { ranges, weaponRace } = require("./utils/consts");
const { armour } = require("./items/armour");
const items = require("./items/item");

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
        this.weapon = items.lookup(this.weapon);

        this.equipWeapon(this.weapon);

        let sh = this.race.toLowerCase();

        this.health = ranges.playerHealth[sh].random();
        this.defence = ranges.defence[sh].random();
    }

    equip(item) {
        if(item.getType() == "Armour") {
            this.equipArmour(item);
        } else if(item.getType() == "Weapon") {
            this.equipWeapon(item);
        } else {
            throw TypeError(item + " is not valid equipment");
        }
    }

    equipArmour(item) {
        let index = armour.indexOf(item.type);

        let equipped = this.equipment[index];

        if(equipped) this.defence -= equipped.rating;

        this.equipment[index] = item;

        this.defence += item.rating;
    }

    equipWeapon(item) {
        this.weapon = item;
        this.attack = item.attack;

        if(weaponRace[item.type] == this.race.toLowerCase()) {
            this.attack.min *= 1.2;
            this.attack.max *= 1.2;
        }
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
    }

    async eat(item) {
        if(this.inventory.hasItem(item)) {
            this.inventory.addItem(item, -1);

            await logger.log("#c:green[you ate:] #c:blue[" + item.name + "]");

            this.health += item.health;

            await this.action();
        }

        //TODO: random event for food poisoning
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

            this.inventory.addItem(berry, amount);

            await logger.log(`#c:green[you found] #c:blue[${amount} berries]`);
        }
    }

    stats() {
        console.table({ player: this });
    }

    async move(direction) {
        await logger.log(`#c:green[you moved:] #c:blue[${direction}]`);

        await this.action();
    }

    async action(type) {
        if(type) await eval(`this.${type}();`);
        await events.tryEvent();
    }

    async set(key) {   
        this[key] = await eval(`prompt('${key}');`);
    }
}

const player = new Player();

module.exports = { player, Player }