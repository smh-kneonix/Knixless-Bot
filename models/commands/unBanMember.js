const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    Client,
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
    
    if (!member) {
        return interaction.reply(`we can't unBan this user`);
    } else {
        interaction.guild.members
            .unban(target.user.id)
            .catch((err) => {
                errText = `we have some problem here : ${err.message}`;
                console.log("our err:" + err.message);
            })
            .finally(() => {
                const result = errText ? errText : `user ${member} get unban`;
                interaction.reply(result);
            });
    }
}
module.exports = { data, execute };
