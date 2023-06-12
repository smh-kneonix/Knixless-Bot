const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

const data = new SlashCommandBuilder()
    .setName("kick")
    .setDescription("kick user")
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
            .setDescription("The reason for kick")
            .setAutocomplete(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
    .setDMPermission(false);
// kick user and give feed back
async function execute(interaction) {
    let errText;
    const reason =
        interaction.options.getString("reason") ?? "No reason provided";
    const member = interaction.options.getMember("target");

    if (!member) {
        return interaction.reply(`we can't kick this user`);
    } else {
        member
            .kick(reason)
            .catch((err) => {
                errText = `we have some problem here : ${err.message}`;
                console.log("our err:" + err.message);
            })
            .finally(() => {
                const result = errText
                    ? errText
                    : `user ${member} get kick for ${reason} reason`;
                interaction.reply(result);
            });
    }
}
module.exports = { data, execute };
