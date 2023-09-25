// eslint-disable-next-line no-unused-vars
const { GuildMember } = require("discord.js");
const { logger } = require("../../logger");
const { getUserRoles, calculateJoinTime } = require("../user");
const EventEmitter = require("node:events");

class CheckUserActivity extends EventEmitter {
    /**
     * @param {GuildMember} subject
     */
    check(subject) {
        const newcomerRole = process.env.NEWCOMER_ROLE;
        logger.debug(`Checking ${subject.displayName}`);
        if (getUserRoles(subject).includes(newcomerRole)) {
            if (getUserRoles(subject).includes(process.env.IMPOSTER_ROLE))
                return;
            const daysSinceJoin = calculateJoinTime(subject);

            if (daysSinceJoin >= 15 && daysSinceJoin < 30) {
                if (subject.user.bot) return;

                logger.info(
                    `${subject.displayName} has been here for ${daysSinceJoin}days so he been added to imposter list`
                );
                this.emit("imposter", subject, daysSinceJoin);
            }

            if (daysSinceJoin >= 30) {
                if (!subject.user.bot) {
                    if (subject.kickable) {
                        logger.info(
                            `${subject.displayName} with ID of ${subject.id} has been here for ${daysSinceJoin}days so he was sent to be kicked`
                        );
                        this.emit("kicked", subject, daysSinceJoin);
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
