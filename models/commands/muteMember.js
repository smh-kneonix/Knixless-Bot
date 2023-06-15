const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    EmbedBuilder
} = require("discord.js");

const data = new SlashCommandBuilder()
    .setName("mute")
    .setDescription("mute user specific time")
    // get username (required)
    .addUserOption((option) => {
        return option
            .setName("target")
            .setDescription("select a user")
            .setRequired(true);
    })
    // get a time per minute as integer (required)
    .addIntegerOption((option) => {
        return option
            .setName("time")
            .setDescription("give some minute")
            .setRequired(true);
    })
    // get an string as reason ( not required )
    .addStringOption((option) =>
        option
            .setName("reason")
            .setDescription("The reason for mute")
            .setAutocomplete(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.MuteMembers)
    .setDMPermission(false);
// time out user and give feed back
async function execute(interaction) {
    let errText;
    const time = interaction.options.getInteger("time");
    const reason =
        interaction.options.getString("reason") ?? "No reason provided";
    const member = interaction.options.getMember("target");
    member
        .timeout(1000 * 60 * time, reason)
        .then(() => {
            const result = `user ${member} get timeout\nfor ${time}min\nreason: ${reason}`;
            const embed = new EmbedBuilder()
                .setColor(0xff3444)
                .setTitle("timeout")
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
module.exports = { data, execute };
