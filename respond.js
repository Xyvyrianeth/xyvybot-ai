var version = "1.0.0.0";

const Discord = require("discord.js");

var { client,config } = require("./client.js");

var admins = "357700219825160194".split(' ');

var AIs = {
    // connect4: require("./games/connect4.js"),
    // squares: require("./games/squares.js"),
    // othello: require("./games/othello.js"),
    // gomoku: require("./games/gomoku.js"),
    channels: require("./games/channels.js").channels
}

function botError(message, err) {
    message.channel.send([
        `\`\`\`Server: ${message.channel.guild.name} (${message.channel.guild.id})`,
        `Channel: ${message.channel.name} (${message.channel.id})\`\`\``,
        `\`\`\`User errored on:\`\`\`<@${message.author.id}>\n`,
        `\`\`\``,
        `Message sent:\`\`\`\`\`\``,
        `${message.content.replace(/`/g, "\\\`")}\`\`\``,
        `\`\`\``,
        `${err.join("\n")}\`\`\``
    ].join('\n'));
}

function respond(message) {
    let sendChat = function(content, options) {
        if (typeof content == "string")
        {
            content = content.replace(/\$user\$/g, `<@${message.author.id}>`);
        }
        if (options == undefined)
        {
            message.channel.send(content);
        }
        else
        {
            message.channel.send(content, options);
        }
    }

    if (/^x!(connect4|squares|othello|gomoku) start$/i.test(message.content))
    {
        if (!AIs.channels.hasOwnProperty(message.channel.id))
        {
            AIs.channels[message.channel.id] = {
                opponent: message.author.id,
                game: message.content.split(' ')[0].substring(2),
                timer: 10 * 60 * 15
            }
        }
        else
        {
            delete AIs.channels[message.channel.id];
        }
    }

    if (/^$/.test(message.content))
    {
        if (AIs.channels.hasOwnProperty(message.channel.id))
        {
            sendChat(`x!${AIs.channels[message.channel.id].game} start`);
            AIs.channels[message.channel.id].game = AIs[AIs.channels[message.channel.id].game].newGame();
        }
    }

    if (message.author.id == "398606274721480725")
    {
        if (/^(connect4|squares|othello|gomoku)_[0-2]_[0-9]{1,}(|vs[0-9]{1,})\.png$/.test(img))
        {

        }
    }
    
    if (admins.includes(message.author.id) && message.content.startsWith("x!js ```js\n") && message.content.endsWith("```"))
    {
        let execute = message.substring(11, message.content.length - 3);
        try
        {
            sendChat("```js\n" + JSON.stringify(eval(execute)) + "```");
        }
        catch (err)
        {
            let stack = err.stack.split('\n');
            let a = stack.length;
            for (let i = 0; i < stack.length; i++)
            {
                if (stack[i].includes("at emitOne"))
                {
                    a = i;
                    break;
                }
            }
            let Err = [];
            let b = false;
            for (let i = 1; i < a; i++)
            {
                Err.push(stack[i]);
                if (/<anonymous>:[0-9]{1,}:[0-9]{1,}/.test(stack[i]))
                {
                    let c = stack[i].match(/<anonymous>:[0-9]{1,}:[0-9]{1,}/)[0].split(':');
                    b = [execute.split('\n')[Number(c[1]) - 1], Number(c[2]) - 1];
                }
            }
            if (!b)
            {
                sendChat("```" + err + "``````\n" + Err.join("\n") + "```");
            }
            else
            {
                return sendChat("```" + err + "``````" + b[0] + '\n' + ' '.repeat(b[1]) + "^```");
            }
        }
    }
}

Object.defineProperty(Array.prototype, 'clone', {
    value: function() {
        return JSON.parse(JSON.stringify(this));
    }
});
Object.defineProperty(Array.prototype, 'random', {
    value: function(a) {
        if (!a)
        {
            return this[Math.random() * this.length | 0];
        }
        else
        {
            let b = [];
            let c = [];
            if (this.length < a)
            {
                a = this.length;
            }
            for (let i = a; i--;)
            {
                let d = Math.random() * this.length | 0;
                if (c.includes(d))
                {
                    i++;
                }
                else
                {
                    c.push(d);
                }
            }
            for (let i = a; i--;)
            {
                b.push(this[c[i]]);
            }
            return b;
        }
    }
});

exports.version = version;
exports.respond = respond;
