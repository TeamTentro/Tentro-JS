const {Message, GuildMember} = require("discord.js");
module.exports = (client) => {
    return {
        prefix: "t!",

        owners: {
            members: [
                "668423998777982997",
                
                "391936025598885891",
                "620690744897699841"
            ],

            /**
             * Simple check if the user is a owner.
             *
             * @example
             * ```js
             * if(!client.config.owners.check(message.user))
             *     return message.reply("only bot owners can run this.");
             * ```
             *
             * @param {User|GuildMember} user
             * @returns {boolean} isOwner
             */
            check: (user) => {
                return [
                    "668423998777982997",
                    
                    "391936025598885891",
                    "620690744897699841"
                ].includes(user.id);
            }
        },

        developers: {
            members: [
                "804970459561066537",
                "620690744897699841",
                "391936025598885891",
                "668423998777982997"
            ],

            /**
             * Simple check if the user is a developer.
             *
             * @example
             * ```js
             * if(!client.config.developers.check(message.user))
             *     return message.reply("only bot developers can run this.");
             * ```
             *
             * @param {User|GuildMember} user
             * @returns {boolean}  isDeveloper
             */
            check: (user) => {
                return [
                    "804970459561066537",
                    "620690744897699841",
                    "734784924619505774",
                    "391936025598885891",
                    "188988455554908160",
                    "826793093549785099",
                    "424921488043540491",
                    "668423998777982997"
                ].includes(user.id);
            }
        },

        permLevels: [
            {
                level: 1,
                name: "User",
                /**
                 * User level
                 * @returns {boolean}
                 */
                check: () => true

            },
            {
                level: 2,
                name: "Helper",
                /**
                 * Helper role check - Level 2
                 * @param {Message} message
                 * @param {GuildMember} member
                 * @returns {boolean}
                 */
                check: (message, member) => {
                    try {
                        const helperRole = (message || member).guild.roles.resolve((message || member).client.settings.roles.helper);
                        return helperRole && (message ? message.member : member).roles.cache.has(helperRole.id);
                    } catch (e) {
                        return false;
                    }
                }
            },
            {
                level: 3,
                name: "Moderator",
                /**
                 * Moderator role check - Level 3
                 * @param {Message} message
                 * @param {GuildMember} member
                 * @returns {boolean}
                 */
                check: (message, member) => {
                    try {
                        const helperRole = (message || member).guild.roles.resolve((message || member).client.settings.roles.moderator);
                        return helperRole && (message ? message.member : member).roles.cache.has(helperRole.id);
                    } catch (e) {
                        return false;
                    }
                }
            },
            {
                level: 4,
                name: "Administrator",
                /**
                 * Admin role check / Permissions check - Level 4
                 * @param {Message} message
                 * @param {GuildMember} member
                 * @returns {boolean}
                 */
                check: (message, member) => {
                    try {
                        let hasRoles = (message || member).client.settings.roles
                        const adminRole = (message || member).guild.roles.resolve((message || member).client.settings.roles.admin);
                        return (!hasRoles && (message ? message.member : member).permissions.has('MANAGE_GUILD')) ||
                            (adminRole && (message ? message.member : member).roles.cache.has(adminRole.id)) ||
                            (!adminRole && (message ? message.member : member).permissions.has('MANAGE_GUILD'));
                    } catch (e) {
                        return false;
                    }
                }
            },
            {
                level: 5,
                name: "Server Owner",
                /**
                 * Server owner check - Level 5
                 * @param {Message} message
                 * @param {GuildMember} member
                 * @returns {boolean | false}
                 */
                check: (message, member) => (message ? message.channel.type === "text" : member) ? ((message || member).guild.ownerId === (message ? message.author : member).id) : false
            },
            {
                level: 7,
                name: "Bot Dev",
                /**
                 * Bot developer role check - Level 10
                 * @param {Message} message
                 * @param {GuildMember} member
                 * @returns {boolean}
                 */
                check: (message, member) => (message ? message.author : member).client.config.developers.check(message ? message.author : member),
            },
            {
                level: 10,
                name: "Bot Owner",
                /**
                 * Bot owner role check - Level 10
                 * @param {Message} message
                 * @param {GuildMember} member
                 * @returns {boolean}
                 */
                check: (message, member) => (message ? message.author : member).client.config.owners.check(message ? message.author : member),
            }
        ]
    }


}
