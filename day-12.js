const fs = require('fs');

fs.readFile('./data/day-12.txt', 'utf8', (err, data) => {
    if (err) console.log(err);

    // Data Structure
    const raw = data.split(/\r?\n/);
    const connections = raw.map(line => {
        return line.split('-');
    });
    const map = {};
    connections.forEach(c => {
        let m = c[0],
            n = c[1];
        if (map[m]) {
            map[m].push(n);
        } else {
            map[m] = [n]
        }
        if (map[n]) {
            map[n].push(m);
        } else {
            map[n] = [m]
        }
    });
    const lowerCasePoints = Object.keys(map).filter(p => {
        if (p == p.toLowerCase() && p !== 'start' && p !== 'end') {
            return p;
        }
    });
    // console.log(lowerCasePoints);
    // console.log(map);

    // Part I
    let paths1 = new Set();
    searchPath('start', ['start']);
    console.log('Part I:', paths1.size);

    function searchPath(checkPoint, path) {
        const nextPoints = map[checkPoint];
        if (checkPoint === 'end') {
            paths1.add(path);
            return;
        }
        nextPoints.forEach(np => {
            if (np == np.toLowerCase() && path.includes(np)) {
                return;
            } else {
                let newPath = [...path];
                newPath.push(np);
                searchPath(np, newPath);
            }
        })
    }

    // Part II
    let paths2 = new Set(); // Use Set to remove duplicates automatically
    lowerCasePoints.forEach(lp => {
        searchPath2('start', ['start'], lp);
    });
    console.log('Part II:', paths2.size);

    function searchPath2(checkPoint, path, lp) {
        const nextPoints = map[checkPoint];
        if (checkPoint === 'end') {
            path = path.join(',');
            paths2.add(path);
            return;
        }
        nextPoints.forEach(np => {
            if (np !== lp && np == np.toLowerCase() && path.includes(np)) {
                return;
            } else if (np === lp && visitedTwice(path, lp)) {
                return;
            } else {
                let newPath = [...path];
                newPath.push(np);
                searchPath2(np, newPath, lp);
            }
        })
    }

    function visitedTwice(path, lp) {
        let visitedPoints = path.filter(p => {
            return p === lp;
        });
        return (visitedPoints.length === 2);
    }
});