const fs = require('fs');

fs.readFile('./data/day-9-smoke-basin.txt', 'utf8', (err, data) => {
    if (err) console.log(err);

    // Data Structure
    const raw = data.split(/\r?\n/);
    const points = raw.map(line => {
        return line.split('').map(num => +num);
    });
    const adjacent = [
        [0, 1],
        [0, -1],
        [-1, 0],
        [1, 0]
    ];
    let lowPoints = [];
    let lowPointCoords = [];

    // Part I
    for (let i = 0; i < points.length; i++) {
        for (let j = 0; j < points[i].length; j++) {
            let p = points[i][j];
            let left = points[i][j - 1],
                right = points[i][j + 1],
                up = points[i - 1] ? points[i - 1][j] : undefined,
                down = points[i + 1] ? points[i + 1][j] : undefined
            let low = true;
            if ((left !== undefined && left <= p) ||
                (right !== undefined && right <= p) ||
                (up !== undefined && up <= p) ||
                (down !== undefined && down <= p)) {
                low = false;
            }
            if (low === true) {
                lowPointCoords.push([i, j]);
                lowPoints.push(p);
            }
        }
    }
    let result1 = 0;
    lowPoints.forEach(lp => {
        let riskLevel = lp + 1;
        result1 += riskLevel;
    });
    console.log('Part I:', result1);

    // Part II
    let sizes = [];
    lowPointCoords.forEach(lpc => {
        let start = [lpc],
            result = new Set([lpc]),
            visited = new Set();
        result = basin(start, result, visited);
        result = removeDup(result);
        sizes.push(result.length);
    });
    sizes = sizes.sort((a, b) => b - a);
    let result2 = sizes[0] * sizes[1] * sizes[2];
    console.log('Part II:', result2);

    function basin(basinPoints, result, visited) {
        let newBasinPoints = [];
        basinPoints.forEach(point => {
            let i = point[0],
                j = point[1];
            if (visited.has([i, j].toString())) {
                return;
            }
            visited.add([i, j].toString());
            adjacent.forEach(a => {
                let ni = i + a[0],
                    nj = j + a[1];
                if (!((0 <= ni && ni < points.length) && (0 <= nj && nj < points[0].length))) {
                    return;
                }
                if (points[ni][nj] === 9) {
                    return;
                }
                newBasinPoints.push([ni, nj]);
            })
        });
        if (newBasinPoints.length > 0) {
            result = [...result, ...newBasinPoints];
            return basin(newBasinPoints, result, visited);
        } else {
            return result;
        }
    }

    function removeDup(points) {
        let filtered = [];
        points.forEach(p => {
            if (!filtered.find(f => {
                    return f[0] === p[0] && f[1] === p[1];
                })) {
                filtered.push(p);
            }
        })
        return filtered;
    }
});