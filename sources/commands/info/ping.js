const { SlashCommandBuilder, PermissionFlagsBits, RESTJSONErrorCodes } = require("discord.js");
const ms = require("ms");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("💻│Show API latency")
        .setDefaultMemberPermissions(PermissionFlagsBits.SendMessages),

    async execute(interaction, client) {
        const author = await interaction.guild.members.cache.get(interaction.user.id);

        try {
            await interaction.reply({ content: "**<:tabs:1031286951275413566>│Ping:** **`" + `${client.ws.ping}` + "`** **ms**"}).then(() => {
                setTimeout(async () => {
                    await interaction.deleteReply().catch((error) => {
                        if (error.code !== RESTJSONErrorCodes.UnknownMessage) {
                            return;
                        } else {
                            return;
                        };
                    });
                }, ms("3s"));
            });
        } catch {
            return;
        };
    },
};
