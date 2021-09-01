module.exports = (client) => {
    export const prefix = "!";

    export let owners = {
        members: [
            "668423998777982997",
            "804970459561066537",
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
         * @param {Member} user
         * @returns {Promise<boolean>} isOwner
         */
        check: async (user) => {
            return this.members.includes(user.id);
        }
    };

    export let developers = {
        members: [
            "804970459561066537",
            "620690744897699841",
            "734784924619505774",
            "391936025598885891",
            "188988455554908160",
            "826793093549785099",
            "424921488043540491",
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
         * @param {Member} user
         * @returns {Promise<boolean>} isDeveloper
         */
        check: async (user) => {
            return this.members.includes(user.id);
        }
    }
}
