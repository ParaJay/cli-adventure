const Image = require("terminal-image");
const store = {};

async function getImage(image) {
    let src = "./res/" + image + ".png";

    if(!store[image]) {
        let img = await Image.file(src);

        store[image] = img;
    }

    return store[image];
}

module.exports = {
    getImage
}