const Discord = require("discord.js");

var channels = {}; // Leave blank

var timer = setInterval(function() {
    for (let i in channels)
    {
        channels[i].timer -= 1;
        if (channels[i].timer == 0)
        {
            delete channels[i];
        }
    }
}, 100);

exports.channels = channels;
