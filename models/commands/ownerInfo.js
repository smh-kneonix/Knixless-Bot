const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("owner")
        .setDescription("owners info"),
    async execute(interaction) {
        await interaction.reply(`<@1004113811541860464> and <@617058233609224208> made me with 🚬`);
    }
};
