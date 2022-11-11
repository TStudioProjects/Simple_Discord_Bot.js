const { RESTJSONErrorCodes } = require("discord.js");
const ms = require("ms");

module.exports = {
    name: "interactionCreate",
    once: false,

    async execute (interaction, client) {
        if (interaction.isChatInputCommand()) {
            const command = await client.commands.get(interaction.commandName);

            if (!command) return;

            try {
                await command.execute(interaction, client);
            } catch (error) {
                try {
                    await interaction.reply({ content: "**<:denied:1031285103948726322>│An error occurred while using the command:** " + "**`" + `/${interaction.commandName}` + "`**" }).then(() => {
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
            };
        };
    },
};
