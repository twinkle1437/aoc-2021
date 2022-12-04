const fs = require('fs');

fs.readFile('./data/day-20.txt', 'utf8', (err, data) => {
	if (err) console.log(err);

	// Data Structure
	const raw = data.split(/\r?\n/);
	const alg = raw[0].replaceAll('#', 1).replaceAll('.', 0);
	const imageMap = raw
		.slice(2)
		.map((line) => line.replaceAll('#', 1).replaceAll('.', 0).split(''));
	const adjacent = [
		[-1, -1],
		[-1, 0],
		[-1, 1],
		[0, -1],
		[0, 0],
		[0, 1],
		[1, -1],
		[1, 0],
		[1, 1],
	];

	// printImageMap(imageMap);
	function printImageMap(imageMap) {
		imageMap.forEach((line) => {
			console.log(line.join(''));
		});
	}

	// Part I
	let imageMap1 = imageMap;
	for (let t = 0; t < 2; t++) {
		imageMap1 = enhance(imageMap1, t);
	}
	let result1 = countLitPixels(imageMap1);
	console.log('Part I:', result1);

	// Part II
	let imageMap2 = imageMap;
	for (let t = 0; t < 50; t++) {
		imageMap2 = enhance(imageMap2, t);
	}
	let result2 = countLitPixels(imageMap2);
	console.log('Part II:', result2);

	function enhance(imageMap, t) {
		const newImageMap = [];
		for (let i = -1; i < imageMap.length + 1; i++) {
			const line = [];
			for (let j = -1; j < imageMap.length + 1; j++) {
				const pixels = [];
				adjacent.forEach(([imgOff, rowOff]) => {
					pixels.push(
						imageMap[i + imgOff]?.[j + rowOff] ??
							alg.charAt(0) & t % 2
					);
				});
				let index = parseInt(pixels.join(''), 2);
				line.push(alg.charAt(index));
			}
			newImageMap.push(line);
		}
		return newImageMap;
	}

	function countLitPixels(imageMap) {
		return imageMap.flat().filter((e) => e == 1).length;
	}
});
