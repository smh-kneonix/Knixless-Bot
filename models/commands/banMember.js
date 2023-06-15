const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    EmbedBuilder
} = require("discord.js");

const data = new SlashCommandBuilder()
    .setName("ban")
    .setDescription("ban user")
    // get username (required)
    .addUserOption((option) => {
        return option
            .setName("target")
            .setDescription("select a user")
            .setRequired(true);
    })
    // get an string as reason ( not required )
    .addStringOption((option) =>
        option
            .setName("reason")
            .setDescription("The reason for ban")
            .setAutocomplete(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .setDMPermission(false);

// Ban user and give feed back
async function execute(interaction) {
    let errText;
    const reason =
        interaction.options.getString("reason") ?? "No reason provided";
    const member = interaction.options.getMember("target");

    if (!member) {
        return interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setColor(0x555555)
                    .setTitle("404")
                    .setDescription(`user not found! 404 :(`)
            ]
        });
    } else {
        member
            .ban({ reason })
            .then(() => {
                const result = `user ${member} get ban.\n reason: ${reason}`;
                const embed = new EmbedBuilder()
                    .setColor(0xff0000)
                    .setTitle("ban")
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
