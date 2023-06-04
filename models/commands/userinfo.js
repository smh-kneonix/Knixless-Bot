const { SlashCommandBuilder, Guild } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("userinfo")
        .setDescription("Provides information about the user.")
        .setDMPermission(false),
    async execute(interaction) {
        // get user info (name,joinDate,avatar) and reply it
        const userName = interaction.user.username;
        const timezone = interaction.member.joinedAt.toLocaleDateString();
        const avatarLink = interaction.user.displayAvatarURL();
        await interaction.reply(
            `${userName}, who joined at ${timezone}.\n${avatarLink}`
        );
    },
};
