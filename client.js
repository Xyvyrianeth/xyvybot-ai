const Discord = require("discord.js");
const client = new Discord.Client();

client.login("NTYxNTc4NzkwODM3Mjg5MDAy.XKA9UQ.L1Gj68z3sKefZaVS4h2smtcuCLE").then(() => {
    console.log("Loaded up");
}).catch(err => {
    console.log("Error logging in:\n" + err);
});
client.on("ready", () => {
    console.log("and ready to go!");
})
// exports.client = client;

// var commands = require("./commands.js");

client.on('message', message => {
    // response(message);
});
