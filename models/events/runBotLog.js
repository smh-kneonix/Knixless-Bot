const { Events } = require("discord.js");

module.exports = {
    name: "ready",
    on: true,
    execute(c) {
        console.log(`Ready! Logged in as ${c.user.tag}`);
    }
};
