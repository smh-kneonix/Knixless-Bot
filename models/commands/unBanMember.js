const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    EmbedBuilder
} = require("discord.js");

const data = new SlashCommandBuilder()
    .setName("unban")
    .setDescription("unban user")
    // get username (required)
    .addStringOption((option) => {
        return option
            .setName("target")
            .setDescription("select a user")
            .setRequired(true);
    })
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .setDMPermission(false);
// unban user and give feed back
async function execute(interaction) {
    let errText;
    const member = interaction.options.getString("target");
    const users = await interaction.guild.bans.fetch();
    const target = users.find(function (user) {
        return user.user.username === member;
    });

    if (!member || !target) {
        return interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(0x555555)
                    .setTitle("404")
                    .setDescription(`user not found! 404 :(`)
            ]
        });
    } else {
        interaction.guild.members
            .unban(target.user.id)
            .then(() => {
                const result = `user ${member} get unban`;
                const embed = new EmbedBuilder()
                    .setColor(0x00ff00)
                    .setTitle("successful")
                    .setDescription(result);
                interaction.reply({ embeds: [embed] });
            })
            .catch((err) => {
                errText = `we have some problem here : ${err.message}`;
                const embed = new EmbedBuilder()
                    .setColor(0x888888)
                    .setTitle("failed!")
                    .setDescription(errText);
                interaction.reply({ embeds: [embed] });
            });
    }
}
module.exports = { data, execute };
