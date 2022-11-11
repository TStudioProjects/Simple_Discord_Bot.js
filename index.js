const { Client, Collection } = require("discord.js");

const fs = require("fs");
const dotenv = require("dotenv");
dotenv.config();

const list = require("./sources/validation");
const functions = fs.readdirSync("./sources/functions").filter(file => file.endsWith(".js"));

const client = new Client({ intents: list.intents, partials: list.partials });
client.commands = new Collection();
client.commandsArray = [];

(async () => {
    for (const file of functions) {
        require(`./sources/functions/${file}`)(client);
    };

    await client.login(process.env.Token).catch(() => {
        return;
    });
})(client);
