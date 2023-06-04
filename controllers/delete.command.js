require("dotenv").config();
const { Routes, REST } = require("discord.js");

const rest = new REST().setToken(process.env.DISCORD_TOKEN);
async function deleteCommand(commandId, interaction) {
    // await rest
    //     .delete(
    //         Routes.applicationGuildCommand(
    //             process.env.APP_ID,
    //             intraction.guild.id,
    //             commandId
    //         )
    //     )
    //     .then(() => console.log("Successfully deleted guild command"))
    //     .catch(function (err) {
    //         console.log(interaction.guild.id);
    //         console.log(err);
    //     });

    rest.delete(Routes.applicationCommand(process.env.APP_ID, commandId))
        .then(() => console.log("Successfully deleted application command"))
        .catch(console.error);
}

module.exports = { deleteCommand };
