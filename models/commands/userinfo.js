const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("userinfo")
        .setDescription("mention someone or use it for your self")
        .addUserOption((option) => {
            return option
                .setName("user")
                .setDescription("mention someone")
                .setRequired(false);
        })
        .setDMPermission(false),

    // get user info (name,joinDate,avatar) and reply it
    async execute(interaction) {
        let userName = interaction.user;
        let userNamed = userName.username;
        const mention = interaction.options.getMember("user");
        let timezone = interaction.member.joinedAt.toLocaleDateString();

        // if mention any user
        if (mention) {
            userName = mention;
            userNamed = mention.user.username;
            timezone = new Date(mention.joinedTimestamp).toLocaleDateString();
        }

        // select avatar
        const avatarLink = userName.displayAvatarURL().toString().split(".");
        avatarLink.pop();
        avatarLink.push("png?size=1024")

        

        const embedContext = new EmbedBuilder()
            .setColor(0x96026a)
            .setTitle(userNamed)
            .setURL(avatarLink.join("."))
            .setDescription(`join at: ${timezone}`)
            .setImage(`${avatarLink.join(".")}`)
            .setTimestamp();

        await interaction.reply({
            embeds: [embedContext],
        });
    },
};
