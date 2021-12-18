const fs = require('fs');

fs.readFile('./data/day-5-hydrothermal-venture.txt', 'utf8', (err, data) => {
    if (err) console.log(err);

    // Data Structure
    const raw = data.split(/\r?\n/);
    let lines = [],
        grid = [];
    raw.forEach(line => {
        let coords = line.split(' -> ');
        lines.push(coords.map(coord => coord.split(',').map(num => +num)));
    })

    // Part I
    refreshGrid();
    let lines1 = lines.filter(line => {
        return (line[0][0] === line[1][0] || line[0][1] === line[1][1]);
    })
    lines1.forEach(line => {
        markStraightLine(line);
    })
    const result1 = countOverlapPoints(grid);
    console.log('Part I:', result1);

    // Part II
    refreshGrid();
    let lines2 = lines.filter(line => {
        return (line[0][0] === line[1][0] || line[0][1] === line[1][1] || (Math.abs(line[0][0] - line[1][0]) === Math.abs(line[0][1] - line[1][1])));
    });
    lines2.forEach(line => {
        markStraightLine(line);
        markDiagonalLine(line);
    })
    const result2 = countOverlapPoints(grid);
    console.log('Part II:', result2);

    function markStraightLine(line) {
        if (line[0][0] === line[1][0]) {
            let x = line[0][0];
            if (line[0][1] < line[1][1]) {
                for (let i = line[0][1]; i <= line[1][1]; i++) {
                    grid[i][x]++;
                }
            } else {
                for (let i = line[1][1]; i <= line[0][1]; i++) {
                    grid[i][x]++;
                }
            }
        }
        if (line[0][1] === line[1][1]) {
            let y = line[0][1];
            if (line[0][0] < line[1][0]) {
                for (let j = line[0][0]; j <= line[1][0]; j++) {
                    grid[y][j]++;
                }
            } else {
                for (let j = line[1][0]; j <= line[0][0]; j++) {
                    grid[y][j]++;
                }
            }
        }
    }

    function markDiagonalLine(line) {
        if ((Math.abs(line[0][0] - line[1][0]) === Math.abs(line[0][1] - line[1][1]))) {
            let x = line[0][0],
                y = line[0][1];
            for (let i = 0; i <= Math.abs(line[0][0] - line[1][0]); i++) {
                if (line[0][0] < line[1][0]) {
                    if (line[0][1] < line[1][1]) {
                        grid[y + i][x + i]++;
                    } else {
                        grid[y - i][x + i]++;
                    }
                } else {
                    if (line[0][1] < line[1][1]) {
                        grid[y + i][x - i]++;
                    } else {
                        grid[y - i][x - i]++;
                    }
                }
            }
        }
    }

    function countOverlapPoints(grid) {
        let result = 0;
        for (let i = 0; i < 999; i++) {
            for (let j = 0; j < 999; j++) {
                if (grid[i][j] > 1) result++;
            }
        }
        return result;
    }

    function refreshGrid() {
        for (let i = 0; i < 999; i++) {
            grid[i] = [];
            for (let j = 0; j < 999; j++) {
                grid[i][j] = 0;
            }
        }
    }
})