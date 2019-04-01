const Discord = require("discord.js");
const client = new Discord.Client();

client.login(process.env.TOKEN).then(() => {
    client.on("ready", () => {
        client.guilds.get("399327996076621825").channels.get("562313696420823042").send("Version " + respond.version + " published successfully!");
    })
}).catch(err => {
    console.log("Error logging in:\n" + err);
});

var { respond } = require("./respond.js");

client.on('message', message => {
    respond(message);
});
