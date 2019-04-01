const Discord = require("discord.js");
const client = new Discord.Client();

client.login(process.env.TOKEN).then(() => {}).catch(err => {
    console.log("Error logging in:\n" + err);
});
client.on("ready", () => {
    client.guilds.get("399327996076621825").channels.get("562313696420823042").send("Version " + version + " published successfully!");
});

var { respond, version } = require("./respond.js");

client.on('message', message => {
    respond(message);
});
