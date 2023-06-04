const grabFiles = require("../util/grab.files");
const path = require("path");

//
function loadEvents(client) {
    // Grab all the event files from the events directory
    const { dirFiles: eventFiles, dirPath: eventsPath } = grabFiles("events");
    // Grab all events and execute them
    for (const file of eventFiles) {
        const filePath = path.join(eventsPath, file);
        const event = require(filePath);
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args));
        } else if (event.on) {
            client.on(event.name, (...args) => event.execute(...args));
        } else {
            console.error("the event cant execute!");
        }
    }
}
module.exports = {
    loadEvents
};
