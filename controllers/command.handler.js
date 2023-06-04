const grabFiles = require("../util/grab.files");
const path = require("path");
const { Routes } = require("discord.js");

function loadCommands(client, rest) {
    // Grab all the command files from the commands directory
    const { dirFiles: commandFiles, dirPath: commandsPath } =
        grabFiles("commands");
    // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
    const commands = [];
    for (const file of commandFiles) {
        const command = require(`../models/commands/${file}`);
        commands.push(command.data.toJSON());
    }

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const command = require(filePath);
        // Set a new item in the Collection with the key as the command name and the value as the exported module
        if ("data" in command && "execute" in command) {
            client.commands.set(command.data.name, command);
        } else {
            console.log(
                `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
            );
        }
    }
    (async () => {
        try {
            console.log(
                `Started refreshing ${commands.length} application (/) commands.`
            );

            // The put method is used to fully refresh all commands in the guild with the current set
            const data = await rest.put(
                // NOTE:if you wanna use your bot commands in all servers
                Routes.applicationCommands(process.env.APP_ID),

                // NOTE:if you wanna use your bot commands in specific sever
                // Routes.applicationGuildCommands(
                //     process.env.APP_ID,
                //     process.env.GUILD_ID
                // ),

                { body: commands }
            );

            console.log(
                `Successfully reloaded ${data.length} application (/) commands.`
            );
        } catch (error) {
            // And of course, make sure you catch and log any errors!
            console.error(error);
        }
    })();
}

module.exports = {
    loadCommands
};
