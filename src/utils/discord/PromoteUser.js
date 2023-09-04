// eslint-disable-next-line no-unused-vars
const { GuildMember } = require("discord.js");
const { logger } = require("../logger");
const EventEmitter = require("node:events");

class PromoteUser extends EventEmitter {
    /**
     *
     * @param {GuildMember} user
     */
    promote(user) {
        const newcomerRole = process.env.NEWCOMER_ROLE;
        const promotionRole = process.env.PROMOTION_ROLE;
        const imposterRole = process.env.IMPOSTER_ROLE;

        user.roles
            .remove([newcomerRole, imposterRole])
            .then(() => {
                user.roles
                    .add(promotionRole)
                    .then(() => {
                        logger.info(`Promoted ${user.displayName}`);
                        this.emit("promotion", user.displayName);
                    })
                    .catch((err) => {
                        logger.error(
                            `Tried to promote ${user.displayName} but the bot failed to add the promotion role`
                        );
                        logger.error(err);
                        this.emit(
                            "error",
                            new Error(
                                `Tried to promote ${user.displayName} but the bot failed to add the promotion role`
                            )
                        );
                    });
            })
            .catch((err) => {
                logger.error(
                    `Tried to promote ${user.displayName} but the newcomer role(s) failed to be removed`
                );
                logger.error(err);
                this.emit(
                    "error",
                    new Error(
                        `Tried to promote ${user.displayName} but the newcomer role(s) failed to be removed`
                    )
                );
            });
    }

    /**
     *
     * @param {GuildMember} user
     */
    reverse(user) {
        const newcomerRole = process.env.NEWCOMER_ROLE;
        const promotionRole = process.env.PROMOTION_ROLE;
        user.roles
            .remove([promotionRole], `${user.displayName} was reverse promoted`)
            .then(() => {
                user.roles
                    .add(newcomerRole)
                    .then(() => {
                        logger.info(`Reverse promoted ${user.displayName}`);
                        this.emit("reverse", user.displayName);
                    })
                    .catch((err) => {
                        logger.error(
                            `Tried to reverse promote ${user.displayName} but the bot failed to add the promotion role`
                        );
                        logger.error(err);
                        this.emit(
                            "error",
                            new Error(
                                `Tried to reverse promote ${user.displayName} but the bot failed`
                            )
                        );
                    });
            })
            .catch((err) => {
                logger.error(
                    `Tried to reverse promote ${user.displayName} but failed`
                );
                logger.error(err);
                this.emit(
                    "error",
                    new Error(
                        `Tried to reverse promote ${user.displayName} but failed`
                    )
                );
            });
    }
}

module.exports = { PromoteUser };
