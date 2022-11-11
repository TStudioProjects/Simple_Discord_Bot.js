const fs = require("fs");
const list = require("../validation");
const dotenv = require("dotenv");
dotenv.config();

const { REST, Routes } = require("discord.js");
const rest = new REST({ version: 10 }).setToken(process.env.Token);

module.exports = async (client) => {
    let commands = fs.readdirSync("./sources/commands/");

    for (const folder of commands) {
        const files = fs.readdirSync(`./sources/commands/${folder}`).filter(file => file.endsWith(".js"));
        for (const file of files) {
            const command = require(`../commands/${folder}/${file}`);

            try {
                await client.commands.set(command.data.name, command);
                await client.commandsArray.push(command.data.toJSON());
            } catch {
                return;
            };

            if (list.commands.includes(command.data.name)) {
                console.log(`[Commands] >> 📂│${command.data.name}`);
            } else if (!list.commands.includes(command.data.name)) {
                console.log("[Commands] >> 🚫│Command name is either invalid or missining.");
            };
        };
    };

    try {
        await rest.put(
            Routes.applicationCommands(process.env.ClientId), { body: client.commandsArray },
        );
    } catch {
        console.log("[Commands] >> 🚫│An error occurred while loading commands.");
    };
};
