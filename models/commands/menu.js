const {
    ActionRowBuilder,
    StringSelectMenuBuilder,
    SlashCommandBuilder,
    EmbedBuilder,
    Events,
    Client,
} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("selectrole")
        .setDescription("You can pick a role"),

    async execute(interaction) {
        const guild = interaction.guild;
        const roles = guild.roles.cache;

        // make array of
        const roleOptions = roles.map((role) => ({
            label: role.name,
            description: role.name + " role",
            value: role.id,
        }));

        const roleSelectMenu = new StringSelectMenuBuilder()
            .setCustomId("select")
            .setPlaceholder("No role selected")
            .setMinValues(1)
            .setMaxValues(3)
            .addOptions(roleOptions);

        const actionRow = new ActionRowBuilder().addComponents(roleSelectMenu);

        const embed = new EmbedBuilder()
            .setColor(0xc03d3)
            .setTitle("Pick a Role")
            .setDescription("You can choose a role for yourself");

        await interaction.reply({
            embeds: [embed],
            components: [actionRow],
        });

        const collector = interaction.channel.createMessageComponentCollector({
            filter: (client) => client.customId,
            time: 15000,
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
                content: "change to death",
            });
        });

        // end of click button and log all collected items
        collector.on("end", (collected) =>
            console.log(`Collected ${collected.size} items`)
        );
    },
};

/*
module.exports = {
    data: new SlashCommandBuilder()
        .setName("selectrole")
        .setDescription("you'r be able to pick roles"),

    row2: new ActionRowBuilder().addComponents(
        new StringSelectMenuBuilder()
            .setCustomId("select2")
            .setPlaceholder("Nothing selected")
            // .setMinValues(1)
            // .setMaxValues(3)
            .addOptions(hi())
    ),
    embed1: new EmbedBuilder()
        .setColor(0xc03d3)
        .setTitle("pick a role")
        .setDescription("you can choose roles for yourself"),

    async execute(interaction) {
        // const roles = interaction.guild.roles.cache
        //     .sort((a, b) => b.position - a.position)
        //     .map((r) => r)
        //     .join(",");

        await interaction.reply({
            // ephemeral: true,
            embeds: [this.embed1],
            components: [this.row2],
        });

        const collector = interaction.channel.createMessageComponentCollector({
            filter: (client) => client.customId,
            time: 15000,
        });
        // when you click on components before end of time do this
        collector.on("collect", async (interaction) => {
            // update your component
            await interaction.reply({
                content: "change to death",
            });
        });

        // end of click button and log all collected items
        collector.on("end", (collected) =>
            console.log(`Collected ${collected.size} items`)
        );

        // console.log(role)
        // interaction.member.roles.add(role)
    },
};
*/
