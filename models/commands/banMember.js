const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

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
        return interaction.reply(`we can't Ban this user`);
    } else {
        member
            .ban({ reason })
            .catch((err) => {
                errText = `we have some problem here : ${err.message}`;
                console.log("our err:" + err.message);
            })
            .finally(() => {
                const result = errText
                    ? errText
                    : `user ${member} get ban for ${reason} reason`;
                interaction.reply(result);
            });
    }
}
module.exports = { data, execute };
