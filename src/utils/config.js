const { logger } = require("./logger");
const { readFileSync, writeFile } = require("fs");

function getConfig(config) {
    const configFile = readFileSync(
        `${process.env.PWD}/config.json`,
        {
            encoding: "utf-8",
        }
    );
    const json = JSON.parse(configFile);
    return json[config];
}

function loadInitial() {
    const configFile = readFileSync(
        `${process.env.PWD}/config.json`,
        {
            encoding: "utf-8",
        }
    );
    const json = JSON.parse(configFile);
    const obj = Object(json);
    for (const [key, value] of Object.entries(obj)) {
        logger.debug(`Setting ${key} to ${value}`);
        process.env[key] = value;
    }
}

function setConfig(config, value) {
    process.env[config] = value;
    const configFile = readFileSync(
        `${process.env.PWD}/config.json`,
        {
            encoding: "utf-8",
        }
    );
    var json = JSON.parse(configFile);
    json[config] = value;
    const newJson = JSON.stringify(json);
    writeFile(`${process.env.PWD}/config.json`, newJson, () => {});
}

module.exports = { getConfig, setConfig, loadInitial };
