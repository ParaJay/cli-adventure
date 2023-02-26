const art = require('ascii-art');
const Image = require('ascii-art-image');
const utils = require("./utils");
const logger = require("./logger");

async function drawImage(imgPath) {
    var image = new Image({
        filepath: imgPath,
        alphabet:'variant4',
        width: 20,
        height: 20
    });

    image.write((err, rendered) => {
        logger.log(rendered);
    });
}

async function writeText(text) {
    let rendered = await art.font(text, 'Doom').completed();

    logger.log(rendered);
}

module.exports = {
    drawImage, writeText
}