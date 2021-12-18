const fs = require('fs');

fs.readFile('./data/day-13.txt', 'utf8', (err, data) => {
    if (err) console.log(err);

    // Data Structure
    const raw = data.split(/\r?\n/);
    const dotStrings = new Set(raw.filter((line, i) => {
        if (i < 916) return line;
    }));
    const foldStrings = raw.filter((line, i) => {
        if (i > 916) return line;
    });
    const folds = foldStrings.map(f => {
        return f.split(' ')[2].split('=');
    });

    // Part I
    let folds1 = [folds[0]];
    let dotsAfterFold1 = foldPaper(dotStrings, folds1, 0);
    console.log('Part I:', dotsAfterFold1.size);

    // Part II
    let dotsAfterFold2 = foldPaper(dotStrings, folds, 0);
    let dots2 = Array.from(dotsAfterFold2).map(ds => {
        return ds.split(',').map(n => +n);
    });
    let paper = []
    for (let y = 0; y < 10; y++) {
        paper[y] = [];
        for (let x = 0; x < 50; x++) {
            paper[y][x] = '.';
        }
    }
    dots2.forEach(d => {
        paper[d[1]][d[0]] = '#';
    });
    console.log('Part II:');
    paper.forEach(p => {
        console.log(p.join(''));
    })

    function foldPaper(dotStrings, folds, i) {
        let foldLine = folds[i][0],
            foldCoord = +folds[i][1],
            dotsAfterFold = new Set();
        if (foldLine === 'x') {
            dotStrings.forEach(ds => {
                let dot = ds.split(','),
                    x = dot[0],
                    y = dot[1],
                    newDot = [];
                if (x > foldCoord) {
                    newDot[0] = foldCoord - (x - foldCoord);
                    newDot[1] = y;
                    let newDotString = `${newDot[0]},${newDot[1]}`;
                    dotsAfterFold.add(newDotString);
                } else {
                    let dotString = `${dot[0]},${dot[1]}`;
                    dotsAfterFold.add(dotString);
                }
            });
        }
        if (foldLine === 'y') {
            dotStrings.forEach(ds => {
                let dot = ds.split(','),
                    x = dot[0],
                    y = dot[1],
                    newDot = [];
                if (y > foldCoord) {
                    newDot[1] = foldCoord - (y - foldCoord);
                    newDot[0] = x;
                    let newDotString = `${newDot[0]},${newDot[1]}`;
                    dotsAfterFold.add(newDotString);
                } else {
                    let dotString = `${dot[0]},${dot[1]}`;
                    dotsAfterFold.add(dotString);
                }
            });
        }
        i++;
        if (i === folds.length) {
            return dotsAfterFold;
        } else {
            return foldPaper(dotsAfterFold, folds, i)
        }
    }
});