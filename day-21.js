const fs = require('fs');

fs.readFile('./data/day-21.txt', 'utf8', (err, data) => {
	if (err) console.log(err);

	// Data Structure
	const raw = data.split(/\r?\n/);
	const start = raw.map((line) => +line.split(': ')[1]);

	// Part I
	let player1Pos = start[0],
		player2Pos = start[1],
		player1Score = 0,
		player2Score = 0,
		turn1 = true,
		r = 0,
		d1 = 1;
	while (true) {
		r += 3;
		let d2 = d1 + 1 > 100 ? 1 : d1 + 1,
			d3 = d2 + 1 > 100 ? 1 : d2 + 1,
			shift = d1 + d2 + d3;
		if (turn1) {
			player1Pos =
				(player1Pos + shift) % 10 === 0
					? 10
					: (player1Pos + shift) % 10;
			player1Score += player1Pos;
			if (player1Score >= 1000) {
				break;
			}
			turn1 = false;
		} else {
			player2Pos =
				(player2Pos + shift) % 10 === 0
					? 10
					: (player2Pos + shift) % 10;
			player2Score += player2Pos;
			if (player2Score >= 1000) {
				break;
			}
			turn1 = true;
		}
		d1 = d3 + 1 > 100 ? 1 : d3 + 1;
	}
	let result1 = Math.min(player1Score, player2Score) * r;
	console.log('Part I:', result1);

	// Part II
});
