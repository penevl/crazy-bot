// eslint-disable-next-line no-unused-vars
const { GuildMember } = require("discord.js");
const { logger } = require("../logger");
const { getUserRoles, calculateJoinTime } = require("./user");
const EventEmitter = require("node:events");

class CheckUserActivity extends EventEmitter {
    /**
     * @param {GuildMember} subject
     */
    check(subject) {
        const imposterRole = process.env.IMPOSTER_ROLE;
        const newcomerRole = process.env.NEWCOMER_ROLE;
        logger.debug(`Checking ${subject.displayName}`);
        if (getUserRoles(subject).includes(newcomerRole)) {
            const daysSinceJoin = calculateJoinTime(subject);

            if (daysSinceJoin >= 15 && daysSinceJoin < 30) {
                if (subject.user.bot) {
                    subject.roles.add(imposterRole);
                    logger.info(
                        `${subject.displayName} has been here for ${daysSinceJoin}days so he was given the imposter role`
                    );
                    this.emit("imposter", subject.displayName, daysSinceJoin);
                }
            }

            if (daysSinceJoin >= 30) {
                if (!subject.user.bot) {
                    if (subject.kickable) {
                        subject.kick();
                        logger.info(
                            `${subject.displayName} with ID of ${subject.id} has been here for ${daysSinceJoin}days so he was kicked`
                        );
                        this.emit(
                            "kicked",
                            subject.displayName,
                            subject.id,
                            daysSinceJoin
                        );
                    } else {
                        logger.error(
                            `It appears that for some reason ${subject.displayName} is un-kickable by the bot`
                        );
                        this.emit(
                            "error",
                            new Error(`Failed to kick ${subject.displayName}`)
                        );
                    }
                }
            }
        }
    }
}

module.exports = { CheckUserActivity };
