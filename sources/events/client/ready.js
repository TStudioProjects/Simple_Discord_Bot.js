const { ActivityType } = require("discord.js");
const ms = require("ms");

module.exports = {
    name: "ready",
    once: false,

    async execute(client) {
        const statusArray = ["📦│TS Oficial Discord Server™", "🎯│Visual Studio Code", "🧩│SPOTIFY"];

        setInterval(() => {
            const random = statusArray[Math.floor(Math.random() * statusArray.length)].split(', ');
            const status = random[0];

            if (status == "📦│TS Oficial Discord Server™") {
                client.user.setPresence({
                    activities: [{ name: status, type: ActivityType.Watching }],
                    status: "online",
                });
            } else if (status == "🧩│SPOTIFY") {
                client.user.setPresence({
                    activities: [{ name: status, type: ActivityType.Listening }],
                    status: "online",
                });
            } else if (status == "🎯│Visual Studio Code") {
                client.user.setPresence({
                    activities: [{ name: status, type: ActivityType.Watching }],
                    status: "online",
                });
            };
        }, ms("10s"));

        console.log("[Client] >> 🤖│Bot is ready");
        console.log(`[Client] >> 🔗│ID: ${client.user.id}`);
    },
};
