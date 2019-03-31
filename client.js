const Discord = require("discord.js");
const client = new Discord.Client();

client.login(process.inv.TOKEN).then(() => {
    console.log("Loaded up");
}).catch(err => {
    console.log("Error logging in:\n" + err);
});
client.on("ready", () => {
    console.log("and ready to go!");
})
// exports.client = client;

var { respond } = require("./respond.js");

client.on('message', message => {
    respond(message);
});
