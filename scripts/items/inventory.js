class Inventory {
    constructor() {
        this.items = {};
    }

    hasItem(item) {
        return this.count(item) > 0;
    }

    addItem(item, amount=1) {
        let owned = this.items[item.name];
        let currentAmount = this.hasItem(item) ? owned : 0;

        this.items[item.name] = amount + currentAmount;
    }

    count(item) {
        let amount = this.items[item.name];

        return amount ? amount : 0;
    }
}

module.exports = {
    Inventory
}