const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

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
            .setDescription("The reason for banning")
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
        .catch((err) => {
            errText = `we have some problem here : ${err.message}`;
            console.log("our err:" + err.message);
        })
        .finally(() => {
            const result = errText
                ? errText
                : `user ${member} get timeout for ${time}min for ${reason} reason`;
            interaction.reply(result);
        });
}
module.exports = { data, execute };
