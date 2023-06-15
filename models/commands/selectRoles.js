const {
    ActionRowBuilder,
    StringSelectMenuBuilder,
    SlashCommandBuilder,
    EmbedBuilder,
    PermissionsBitField
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("selectrole")
        .setDescription("You can pick a role"),

    async execute(interaction) {
        const roles = interaction.guild.roles.cache;

        const roleOptions = [];

        const keys = [];
        for (const [key, _] of Object.entries(PermissionsBitField.Flags)) {
            keys.push(key);
        }
        roles.forEach(function (role) {
            let allow;
            for (let i = 0; i < keys.length; i++) {
                if (!allow) {
                    allow = role.permissions.has(
                        PermissionsBitField.Flags[keys[i]]
                    );
                } else {
                    break;
                }
            }

            if (!allow) {
                roleOptions.push({
                    label: role.name,
                    description: role.name + " role",
                    value: role.id
                });
            }
        });

        const roleSelectMenu = new StringSelectMenuBuilder()
            .setCustomId("select")
            .setPlaceholder("No role selected")
            .setMinValues(1)
            .setMaxValues(1)
            .addOptions(roleOptions);

        const actionRow = new ActionRowBuilder().addComponents(roleSelectMenu);

        const embed = new EmbedBuilder()
            .setColor(0xc03d3)
            .setTitle("Pick a Role")
            .setDescription("You can choose a role for yourself");

        await interaction.reply({
            ephemeral: true,
            embeds: [embed],
            components: [actionRow]
        });

        const collector = interaction.channel.createMessageComponentCollector({
            filter: (client) => client.customId,
            time: 20000
        });
        // when you click on components before end of time do this
        collector.on("collect", async (interaction) => {
            console.log(interaction);
            const values = interaction.values;
            values.forEach((roleId) => {
                interaction.member.roles.add(roleId);
            });
            // update your component
            await interaction.reply({
                ephemeral: true,
                embeds: [
                    new EmbedBuilder()
                        .setColor(0x00ff00)
                        .setTitle("successful")
                        .setDescription("roles successfully added")
                ]
            });
        });

        // end of click button and log all collected items
        collector.on("end", (collected) =>
            console.log(`Collected ${collected.size} items`)
        );
    }
};
