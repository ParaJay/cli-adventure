const utils = require("../scripts/utils/utils");

describe("test utils.capitalizeArray", () => {
    test("expect capitalizeArray(['hello', 'world'], 1) to be 'helloWorld'", () => {
        expect(utils.capitalizeArray(["hello", "world"], 1)).toBe("helloWorld");
    });

    test("expect capitalizeArray(['hello', 'there']) to be HelloThere", () => {
        expect(utils.capitalizeArray(["hello", "there"])).toBe("HelloThere");
    });

    test("expect capitalizeArray(['this', 'is', 'a', 'test'], 2, ' ') to be 'this is A Test'", () => {
        expect(utils.capitalizeArray(['this', 'is', 'a', 'test'], 2, ' ')).toBe("this is A Test");
    });
});