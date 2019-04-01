var version = "1.0.0.1";

const Discord = require("discord.js");

var admins = "357700219825160194".split(' ');

var AIs = {
    // connect4: require("./games/connect4.js"),
    squares: require("app/games/squares.js"),
    // othello: require("./games/othello.js"),
    // gomoku: require("./games/gomoku.js"),
    channels: require("app/games/channels.js").channels
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

    if (AIs.channels.hasOwnProperty(message.channel.id))
    {
        if (/^x!(connect4|squares|othello|gomoku) start$/i.test(message.content) && message.author.id !== "561578790837289002")
        {
            delete AIs.channels[message.channel.id];
        }

        if (message.content == "<@561578790837289002>")
        {
            sendChat(`x!${AIs.channels[message.channel.id].game} start`);
        }

        if (message.channel.id == "398606274721480725")
        {
            if (message.content.startsWith("The game has started!"))
            {
                if (message.content.match(/<@[0-9]{,1}>/g)[0] == "<@561578790837289002>")
                {
                    let response = AIs[AIs.channels[message.channel.id].game].myTurn(message.channel.id);
    
                    setTimeout(function() {
                        sendChat(response);
                    }, 5000);
                }
                else
                {
                    AIs.channels[message.channel.id].enemyTurn = true;
                    AIs.channels[message.channel.id].timer = 10 * 60 * 5;
                }
            }

            if (message.content == "It is <@561578790837289002>'s turn.")
            {
                AIs.channels[message.channel.id].enemyTurn = false;
                let response = AIs[AIs.channels[message.channel.id].game].myTurn(message.channel.id);

                setTimeout(function() {
                    sendChat(response);
                    AIs.channels[message.channel.id].timer = 10 * 60 * 5;
                }, 5000);
            }

            if (message.content == `It is <@${AIs.channels[message.channel.id].opponent}>'s turn.`)
            {
                AIs.channels[message.channel.id].enemyTurn = true;
            }

            if (/^<@[0-9]{1,}> has won!$/.test(message.content))
            {
                delete AIs.channels[message.channel.id];
            }
        }

        if (message.author.id == AIs.channels[message.channel.id].opponent && AIs.channels[message.channel.id].enemyTurn && /^([a-j] ?(?:10|[1-9])|(?:10|[1-9]) ?[a-j])$/i.test(message.content))
        {
            AIs[AIs.channels[message.channel.id].game].enemyTurn(message.channel.id, message.content);
        }
    }
    else
    {
        if (/^x!(connect4|squares|othello|gomoku) start$/i.test(message.content))
        {
            AIs.channels[message.channel.id] = {
                opponent: message.author.id,
                game: message.content.split(' ')[0].substring(2),
                timer: 10 * 60 * 15,
                board: AIs.channels[message.content.split(' ')[0].substring(2)].newGame()
            }
        }
    }
    
    if (admins.includes(message.author.id) && message.content.startsWith("x!js ```js\n") && message.content.endsWith("```"))
    {
        let execute = message.content.substring(11, message.content.length - 3);
        try
        {
            sendChat("```JS\n" + JSON.stringify(eval(execute)) + "```");
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
