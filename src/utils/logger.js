require("dotenv").config();
const winston = require("winston");
const LOG_LEVEL = process.env.LOG_LEVEL;

if (LOG_LEVEL == null || LOG_LEVEL == "") {
    // eslint-disable-next-line no-console
    console.error("LOG_LEVEL not deffined");
    process.exit(-1);
}

/**
 * @returns {winston.Logger}
 */
const logger = winston.createLogger({
    level: LOG_LEVEL,
    format: winston.format.json(),
    defaultMeta: { service: "user-service" },
    transports: [
        new winston.transports.File({
            filename: `${new Date().toISOString()}.log`,
            dirname: "logs",
            format: winston.format.combine(
                winston.format.timestamp(),
                winston.format.json()
            ),
        }),
        new winston.transports.Console({
            format: winston.format.cli(),
        }),
    ],
});

module.exports = { logger };
