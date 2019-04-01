const { channels } = require("/app/games/channels.js");

exports.newGame = function() {
    return [
    	[false, false, false, false, false, false, false, false, false, false],
    	[false, false, false, false, false, false, false, false, false, false],
    	[false, false, false, false, false, false, false, false, false, false],
    	[false, false, false, false, false, false, false, false, false, false],
    	[false, false, false, false, false, false, false, false, false, false],
    	[false, false, false, false, false, false, false, false, false, false],
    	[false, false, false, false, false, false, false, false, false, false],
    	[false, false, false, false, false, false, false, false, false, false],
    	[false, false, false, false, false, false, false, false, false, false],
    	[false, false, false, false, false, false, false, false, false, false]
    ];
}

exports.myTurn = function(channel) {
	let game = channels[channel];
	let spaces = [];
	for (let y = 0; y < 10; y++)
	{
		for (let x = 0; x < 10; x++)
		{
            if (game.board[y][x] === false)
            {
                space = [0, y, x];
                for (let d = 0; d < 4; d++)
                {
                    let dir = [
                        [-1, -1],
                        [-1, 1],
                        [1, 1],
                        [1, -1]
                    ][d];
                    let size;
                    switch (d)
                    {
                        case 0:
                        {
                            size = x <= y ? x : y;
                            break;
                        }
                        case 1:
                        {
                            size = 9 - x <= y ? 9 - x : y;
                            break;
                        }
                        case 2:
                        {
                            size = 9 - (x >= y ? x : y);
                            break;
                        }
                        case 3:
                        {
                            size = x <= 9 - y ? x : 9 - y;
                            break;
                        }
                    }
                    for (let s = 1; s <= size; s++)
                    {
                        corners = [
                            game.board[y + (s * dir[0])][x               ],
                            game.board[y               ][x + (s * dir[1])],
                            game.board[y + (s * dir[0])][x + (s * dir[1])]
                        ];
                        if (corners.filter(p => p === 1).length === 0)
                        {
                            space[0] += [0, 1, 10, 100][corners.filter(p => p === 0).length];
                        }
                    }
                }
                if (spaces[0][0] < space[0])
                {
                    spaces = [space];
                }
                if (spaces[0][0] == space[0])
                {
                    spaces.push(space);
                }
            }
		}
	}
    
    let space = spaces[Math.random() * topSpaces.length | 0];
    game.board[space[1]][space[2]] = 0;
	return space[1] + (space[2] + 10).toString(20);
}

exports.enemyTurn = function(channel, spot) {
    board = channels[channel].board;
    Spot = [spot.match(/[0-9]{1,2}/)[0] - 1, 'abcdefghij'.indexOf(spot.toLowerCase().match(/[a-j]/)[0])]
    if (board[Spot[0]][Spot[1]] === false)
    {
	    board[Spot[0]][Spot[1]] = 1;
    }
}
