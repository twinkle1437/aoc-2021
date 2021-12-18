const fs = require('fs');

fs.readFile('./data/day-11.txt', 'utf8', (err, data) => {
    if (err) console.log(err);

    // Data Structure
    const raw = data.split(/\r?\n/);
    const octopus1 = raw.map(line => {
        return line.split('').map(num => +num);
    });
    const octopus2 = raw.map(line => {
        return line.split('').map(num => +num);
    });
    const adjacent = [
        [0, -1],
        [0, 1],
        [-1, 0],
        [1, 0],
        [-1, -1],
        [-1, 1],
        [1, -1],
        [1, 1]
    ];

    // Part I
    let step = 100,
        result1 = 0;
    while (step > 0) {
        let flashed = [];
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                octopus1[i][j]++;
            }
        }
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                if (octopus1[i][j] > 9) {
                    flash(octopus1, flashed, i, j);
                }
            }
        }
        result1 += flashed.length;
        step--;
    }
    console.log('Part I:', result1);

    // Part II
    let result2 = 0,
        steps = 0;
    while (!result2) {
        steps++;
        let flashed2 = [];
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                octopus2[i][j]++;
            }
        }
        for (let i = 0; i < 10; i++) {
            for (let j = 0; j < 10; j++) {
                if (octopus2[i][j] > 9) {
                    flash(octopus2, flashed2, i, j);
                }
            }
        }
        if (flashed2.length === 100) {
            result2 = steps;
        }
    }
    console.log('Part II:', result2);

    function flash(octopus, flashed, i, j) {
        flashed.push(`(${i},${j})`);
        octopus[i][j] = 0;
        adjacent.forEach(adj => {
            let m = i + adj[0],
                n = j + adj[1];
            if (octopus[m] && octopus[m][n]) {
                octopus[m][n]++;
                if (octopus[m][n] > 9) {
                    flash(octopus, flashed, m, n)
                }
            }
        });
    }
});