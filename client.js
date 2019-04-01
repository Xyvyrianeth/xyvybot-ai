const Discord = require("discord.js");
const client = new Discord.Client();

client.login(process.env.TOKEN).then(() => {
    console.log("Loaded up");
}).catch(err => {
    console.log("Error logging in:\n" + err);
});
client.on("ready", () => {
    console.log("and ready to go!");
})

var { respond } = require("./respond.js");

client.on('message', message => {
    respond(message);
});
