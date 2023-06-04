// ------------find path of files and read them ------------
const routeDir = require("./path.route");
const path = require("path");
const fs = require("fs");
module.exports = (dirName) => {
    const dirPath = path.join(routeDir, "models", `${dirName}`);
    const dirFiles = fs
        .readdirSync(dirPath)
        .filter((file) => file.endsWith(".js"));
    return { dirFiles, dirPath };
};
