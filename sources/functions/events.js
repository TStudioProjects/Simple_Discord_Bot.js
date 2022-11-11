const fs = require("fs");
const list = require("../validation");

module.exports = async (client) => {
    const events = fs.readdirSync("./sources/events/");
    
    for (const folder of events) {
        const files = fs.readdirSync(`./sources/events/${folder}`).filter(file => file.endsWith(".js"));
        
        for (const file of files) {
            const event = require(`../events/${folder}/${file}`);
            
            if (list.events.includes(event.name)) {
                console.log(`[Events] >> 📂│${event.name}`);
            } else if (!list.events.includes(event.name)) {
                console.log("[Events] >> 🚫│Event name is either invalid or missining.");
            };

            if (event.once == true) {
                client.once(event.name, (...args) => event.execute(...args, client));
            } else if (event.once == false) {
                client.on(event.name, (...args) => event.execute(...args, client));
            };
        };
    };
};
