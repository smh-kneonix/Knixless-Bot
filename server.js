const { runBot } = require("./app");

async function startServer() {
  console.log("server run");
  await runBot();
}

startServer();
