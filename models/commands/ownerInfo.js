const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("owner")
        .setDescription("owners info"),
    async execute(interaction) {
        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(0x0099ff)
                    .setTitle("<Who made me />")
                    .setURL("https://github.com/smh-kneonix/Knixless-Bot")
                    .setDescription(
                        `<@1004113811541860464> and <@617058233609224208> made me with 🚬`
                    )
                    .setAuthor({
                        name: "Devless server",
                        iconURL:
                            "https://cdn.discordapp.com/icons/902808477745958993/931444cfcf30fc52e5e6a096dae61256.webp?size=128",
                        url: "https://discord.gg/WJbr2xHuZe"
                    })
            ]
        });
    }
};
