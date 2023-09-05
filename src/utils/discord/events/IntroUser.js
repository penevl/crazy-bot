// eslint-disable-next-line no-unused-vars
const { GuildMember } = require("discord.js");
const { logger } = require("../../logger");
const EventEmitter = require("node:events");

class IntroUser extends EventEmitter {
    /**
     *
     * @param {GuildMember} user
     */
    intro(user) {
        const introRole = process.env.INTRO_ROLE;
        const guild = user.guild;
        user.roles
            .remove(introRole)
            .then(() => {
                guild.roles.fetch(introRole).then((role) => {
                    logger.info(`${user.displayName} was introed`);
                    this.emit("intro", user.displayName, role.name);
                });
            })
            .catch((err) => {
                guild.roles.fetch(introRole).then((role) => {
                    logger.error(
                        `Tried to intro ${user.displayName} but the role failed to be removed`
                    );
                    logger.error(err);
                    this.emit(
                        "error",
                        new Error(
                            `Failed to remove role ${role.name} from ${user.displayName}`
                        )
                    );
                });
            });
    }

    /**
     *
     * @param {GuildMember} user
     */
    reverse(user) {
        const introRole = process.env.INTRO_ROLE;
        const guild = user.guild;

        user.roles
            .add(introRole, `${user.displayName} was reverse introed`)
            .then(() => {
                guild.roles.fetch(introRole).then((role) => {
                    logger.info(
                        `Reverse introed ${user.displayName}`
                    );
                    this.emit("reverse", user.displayName, role.name);
                });
            })
            .catch((err) => {
                guild.roles.fetch(introRole).then((role) => {
                    logger.error(
                        `Tried to reverse intro ${user.displayName} but the role failed to be added`
                    );
                    logger.error(err);
                    this.emit(
                        "error",
                        new Error(
                            `Failed to add role ${role.name} to ${user.displayName}`
                        )
                    );
                });
            });
    }
}

module.exports = { IntroUser };
