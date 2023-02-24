const { Range } = require("../scripts/utils/range");

describe("range tests", () => {
    test("expect range(4, 9).random to be >= 4 and <= 9", () => {
        let r = new Range(4, 9).random();

        expect(r).toBeGreaterThanOrEqual(4);
        expect(r).toBeLessThanOrEqual(9);
    });

    test("expect range(1, 1).random to be 1", () => {
        expect(new Range(1, 1).random()).toBe(1);
    });
});