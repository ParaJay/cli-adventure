class Inventory {
    constructor() {
        this.items = {};
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

    count(item) {
        if(this.hasItem(item)) {
            return this.items[item.name];
        } else {
            return 0;
        }
    }
}

module.exports = {
    Inventory
}