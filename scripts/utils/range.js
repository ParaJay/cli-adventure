const { Random } = require("./random");

class Range {
    constructor(min, max) {
        this.min = min;
        this.max = max;
        this.mid = (this.min + this.max) / 2;
    }

    random() {
        return new Random().randint(this.min, this.max);
    }

    toString() {
        return "range[" + this.min + "-" + this.max + "]";
    }
}

module.exports = { Range }