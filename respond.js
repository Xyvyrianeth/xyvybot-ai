var version = "1.0.3.8";

const Discord = require("discord.js");

var admins = "357700219825160194".split(' ');

var AIs = {
    // connect4: require("/app/games/connect4.js"),
    squares: require("/app/games/squares.js"),
    // othello: require("/app/games/othello.js"),
    // gomoku: require("/app/games/gomoku.js"),
    channels: require("/app/games/channels.js").channels
}

function botError(message, err) {
    message.channel.send([
        `\`\`\``,
        `${err.join("\n")}\`\`\``
    ].join('\n'));
}

function respond(message) {
    let sendChat = function(content) {
        message.channel.send(content);
    }

    try
    {
        if (AIs.channels.hasOwnProperty(message.channel.id))
        {
            if (/^x!(connect4|squares|othello|gomoku) start$/i.test(message.content) && message.author.id !== "561578790837289002")
            {
                delete AIs.channels[message.channel.id];
            }
            else
            if (message.content == "<@561578790837289002>")
            {
                sendChat(`x!${AIs.channels[message.channel.id].game} start`);
            }
            else
            if (message.author.id == "398606274721480725")
            {
                if (message.content.startsWith("The game has started!"))
                {
                    if (message.content.includes("<@561578790837289002> will be dark"))
                    {
                        AIs.channels[message.channel.id].enemyTurn = false;
                        let response = AIs[AIs.channels[message.channel.id].game].myTurn(message.channel.id);
        
                        setTimeout(function() {
                            sendChat(response);
                        }, 5000);
                    }
                    else
                    {
                        AIs.channels[message.channel.id].enemyTurn = true;;
                    }
                }
                else
                if (message.content == "It is <@561578790837289002>'s turn.")
                {
                    AIs.channels[message.channel.id].enemyTurn = false;
                    let response = AIs[AIs.channels[message.channel.id].game].myTurn(message.channel.id);

                    setTimeout(function() {
                        sendChat(response);
                    }, 5000);
                }
                else
                if (message.content == `It is <@${AIs.channels[message.channel.id].opponent}>'s turn.`)
                {
                    AIs.channels[message.channel.id].enemyTurn = true;
                }
                else
                if (/^<@[0-9]{1,}> has won!$/.test(message.content))
                {
                    delete AIs.channels[message.channel.id];
                }
                else
                if (message.content.startsWith("Whoops"))
                {
                    delete AIs.channels[message.channel.id];
                }
            }
            else
            if (message.author.id == AIs.channels[message.channel.id].opponent && AIs.channels[message.channel.id].enemyTurn && AIs.channels[message.channel.id].regexp.test(message.content))
            {
                AIs[AIs.channels[message.channel.id].game].enemyTurn(message.channel.id, message.content);
            }
            else
            if (message.content.split(' ')[0] == `x!${AIs.channels[message.channel.id].game}` && "quit forfeit leave".split(' ').includes(message.content.split(' ')[1]))
            {
                delete AIs.channels[message.channel.id];
            }
        }
        else
        {
            if (message.author.id == "398606274721480725" && /^<@[0-9]{0,}> is now requesting a new game of (Squares)!$/.test(message.content))
            {
                let game = {
                    "Squares": "squares",
                    "Connect Four": "connect4",
                    "Othello": "othello",
                    "Gomoku": "gomoku",
                    "3D Tic Tac Toe": "3dttt"
                }[message.content.match(/(Squares)/)[0]];
                if (AIs.hasOwnProperty(game))
                {
                    newGame = AIs[game].newGame();
                    AIs.channels[message.channel.id] = {
                        opponent: message.content.match(/^<@[0-9]{0,}/)[0].substring(2),
                        game: game,
                        board: newGame[0],
                        O: newGame[1],
                        D: newGame[2],
                        P: newGame[3],
                        regexp: newGame[4]
                    }
                }
            }
        }
        
        if (admins.includes(message.author.id) && message.content.startsWith("x!JS ```js\n") && message.content.endsWith("```"))
        {
            let execute = message.content.substring(11, message.content.length - 3);
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
    catch (err)
    {
        let errs = [];
        for (let i = 0; i < err.stack.split('\n').length; i++)
        {
            if (err.stack.split('\n')[i].includes("at emitOne"))
            {
                break;
            }
            else
            {
                errs.push(err.stack.split('\n')[i]);
            }
        }
        botError(message, errs);
    }
}

exports.version = version;
exports.respond = respond;
