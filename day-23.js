const parseInput = (data) => data.map((l) => l.split(''));
const charVal = (ch) => ch.charCodeAt(0) - 65;
const charCost = (ch) => Math.pow(10, charVal(ch));
const stateVal = (map) =>
	map.reduce((res, line) => res + line.join('').replace(/#/g, ''), '');
const cloneMap = (source) => source.map((row) => row.slice());
const part1Input = [
	'#############',
	'#...........#',
	'###C#B#A#D###',
	'###C#D#A#B###',
	'#############',
];

const part2Input = [
	'#############',
	'#...........#',
	'###C#B#A#D###',
	'###D#C#B#A###',
	'###D#B#A#C###',
	'###C#D#A#B###',
	'#############',
];

const part1Final = [
	'#############',
	'#...........#',
	'###A#B#C#D###',
	'###A#B#C#D###',
	'#############',
];

const part2Final = [
	'#############',
	'#...........#',
	'###A#B#C#D###',
	'###A#B#C#D###',
	'###A#B#C#D###',
	'###A#B#C#D###',
	'#############',
];

const distanceMap = (map, x, y) => {
	const canSpreadTo = (x, y) => map[y][x] == '.';
	const spread = (x, y, dist) => {
		if (canSpreadTo(x, y)) map[y][x] = dist;
		if (canSpreadTo(x - 1, y)) spread(x - 1, y, dist + 1);
		if (canSpreadTo(x + 1, y)) spread(x + 1, y, dist + 1);
		if (canSpreadTo(x, y - 1)) spread(x, y - 1, dist + 1);
		if (canSpreadTo(x, y + 1)) spread(x, y + 1, dist + 1);
	};
	spread(x, y, 0);
	return map;
};

const solve = (finalState, initState) => {
	const isFinalState = (map) =>
		map.every((line, y) => line.join('') == finalState[y]);
	const refinePossibleMoveTargets = (map, dMap, ox, oy) => {
		const adjacentToCaves = (x, y) => y == 1 && [3, 5, 7, 9].includes(x);
		const isObjectsHouse = (x, y) =>
			y > 1 && x == charVal(map[oy][ox]) * 2 + 3;
		const objectsHouseCanBeEntered = (res = true) => {
			let x = charVal(map[oy][ox]) * 2 + 3;
			for (let y = 2; y < rows - 1; y++) {
				if (!['.', map[oy][ox]].includes(map[y][x])) {
					res = false;
					break;
				}
			}
			return res;
		};
		let objectOnFirstRow = oy == 1,
			houseAvailable = objectsHouseCanBeEntered(),
			targets = [];

		for (let y = 1; y < rows - 1; y++)
			for (let x = 1; x < cols - 1; x++) {
				if (parseInt(dMap[y][x]) != dMap[y][x]) continue;
				if (objectOnFirstRow && y == 1) continue;
				if (
					objectOnFirstRow &&
					(!isObjectsHouse(x, y) || !houseAvailable)
				)
					continue;
				if (
					objectOnFirstRow &&
					isObjectsHouse(x, y) &&
					houseAvailable
				) {
					if (!['#', map[oy][ox]].includes(map[y + 1][x])) continue;
				}
				if (!objectOnFirstRow && y != 1) continue;
				if (!objectOnFirstRow && adjacentToCaves(x, y)) continue;
				targets.push({ x: x, y: y, dist: dMap[y][x] });
			}
		return targets;
	};

	let cols = initState[0].length,
		rows = initState.length,
		map = parseInput(initState);
	let paths = [{ state: map, val: stateVal(map), cost: 0 }],
		best = {},
		final = [];

	while (paths.length > 0) {
		let p = paths.pop();
		for (let y = 1; y < rows - 1; y++)
			for (let x = 1; x < cols - 1; x++) {
				if (!'ABCD'.includes(p.state[y][x])) continue;

				let ch = p.state[y][x],
					finalPosReached = false;
				if (x == charVal(ch) * 2 + 3) {
					finalPosReached = true;
					for (let j = y + 1; j < rows - 1; j++)
						if (p.state[j][x] != ch) finalPosReached = false;
				}

				if (finalPosReached) continue;

				let nextMoves = refinePossibleMoveTargets(
					p.state,
					distanceMap(cloneMap(p.state), x, y),
					x,
					y
				);
				if (nextMoves.length == 0) continue;

				nextMoves.forEach((move) => {
					let tmp = { state: cloneMap(p.state) };
					tmp.state[y][x] = '.';
					tmp.state[move.y][move.x] = p.state[y][x];
					tmp.val = stateVal(tmp.state);
					tmp.cost = p.cost + charCost(p.state[y][x]) * move.dist;
					let isFinal = isFinalState(tmp.state);
					if (
						best[tmp.val] == undefined ||
						best[tmp.val] > tmp.cost
					) {
						best[tmp.val] = tmp.cost;
						if (isFinal) final.push(tmp);
						else paths.push(tmp);
					}
				});
			}
	}

	return final.sort((a, b) => a.cost - b.cost)[0].cost;
};

console.log(solve(part1Final, part1Input));
console.log(solve(part2Final, part2Input));
