const art = require('ascii-art');
const Image = require('ascii-art-image');
const utils = require("./utils");
const logger = require("./logger");
const store = {}

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

async function colourText(text, colour) {
    return art.style(text, colour, true);
}

async function colourAll(colour) {
    return art.style("", colour);
}

async function animateText(text, colours=["white"], delay=200) {
    let write = "";
    let currentColour = 0;
    let texts = [];

    for(let i = 0; i < text.length; i++) {
        write += text.charAt(i);

        storeText(write);

        texts.push(write);
    }

    for(let i = 0; i < texts.length; i++) {
        let char = text.charAt(i);
        let str = texts[i];
        let colour = colours[currentColour];

        if(char != " " && colours) {            
            if(currentColour++ >= colours.length) currentColour = 0;
        }

        console.clear();
        await writeText(str, colour);

        if(char != " ") await utils.sleep(delay);
    }
}

async function storeText(text) {
    if(store[text])
    return;

    let rendered = await art.font(text, 'Doom').completed();

    store[text] = rendered;
}

async function writeText(text, colour="white") {
    if(!store[text]) await storeText(text);

    logger.log(await colourAll(colour));

    logger.log(store[text]);

    logger.log(await colourAll("white"));
}

module.exports = {
    drawImage, writeText, animateText
}