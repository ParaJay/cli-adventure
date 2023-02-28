class Inventory {
    constructor() {
        this.items = {};
    }

    hasItem(item) {
        return this.count(item) > 0;
    }

    addItem(item, amount=1) {
        let currentAmount = this.count(item);

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