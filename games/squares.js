const { channels } = require("/app/games/channels.js");

exports.newGame = function() {
    return [
        [
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
        ],
        [0, 1, Math.random() * 10 + 5 | 0, Math.random() * 40 + 100 | 0],
        [0, 1, Math.random() * 10 + 5 | 0, Math.random() * 40 + 100 | 0],
        Math.random() * 3 | 0
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
                let space = [0, y, x];
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
                        // Offense
                        if (corners.filter(p => p === 1).length === 0)
                        {
                            space[0] += game.O[corners.filter(p => p === 0).length];
                        }
                        // Defense
                        if (corners.filter(p => p === 0).length === 1)
                        {
                            space[0] += game.D[corners.filter(p => p === 1).length];
                        }
                    }
                }
                spaces.push(space);
            }
		}
	}
    
    spaces.sort((a, b) => {
        return b[0] - a[0];
    });
    let space = spaces[Math.random() * game.P | 0];
    game.board[space[1]][space[2]] = 0;
    return (space[1] + 1) + (space[2] + 10).toString(20);
}

exports.enemyTurn = function(channel, spot) {
    board = channels[channel].board;
    Spot = [spot.match(/[0-9]{1,2}/)[0] - 1, 'abcdefghij'.indexOf(spot.toLowerCase().match(/[a-j]/)[0])]
    if (board[Spot[0]][Spot[1]] === false)
    {
        board[Spot[0]][Spot[1]] = 1;
    }
}
