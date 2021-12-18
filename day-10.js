const fs = require('fs');

fs.readFile('./data/day-10.txt', 'utf8', (err, data) => {
    if (err) console.log(err);

    // Data Structure
    const raw = data.split(/\r?\n/);
    const pairs = [
        ['(', ')'],
        ['[', ']'],
        ['{', '}'],
        ['<', '>']
    ];
    const scoresMap1 = {
        ')': 3,
        ']': 57,
        '}': 1197,
        '>': 25137
    };
    const scoresMap2 = {
        '(': 1,
        '[': 2,
        '{': 3,
        '<': 4
    };

    // Part I
    const errorCountMap = {
        ')': 0,
        ']': 0,
        '}': 0,
        '>': 0
    };
    raw.forEach(line => {
        let stack = [],
            findError = false;
        for (const c of line) {
            pairs.every(p => {
                if (c === p[0]) {
                    stack.push(c);
                    return true;
                } else if (c === p[1]) {
                    let left = stack.pop();
                    if (left !== p[0]) {
                        findError = true;
                        errorCountMap[c]++;
                        return false;
                    }
                } else {
                    return true;
                }
            })
            if (findError) {
                break;
            }
        }
    })
    let result1 = 0;
    for (const c in errorCountMap) {
        result1 += errorCountMap[c] * scoresMap1[c];
    }
    console.log('Part I:', result1);

    // Part II
    let completeTotalScores = [];
    raw.forEach(line => {
        let stack = [],
            findError = false;
        for (const c of line) {
            pairs.every(p => {
                if (c === p[0]) {
                    stack.push(c);
                    return false;
                } else if (c === p[1]) {
                    let left = stack.pop();
                    if (left !== p[0]) {
                        findError = true;
                        return false;
                    }
                } else {
                    return true;
                }
            })
            if (findError) {
                break;
            }
        }
        if (!findError && stack.length > 0) {
            let completeTotalScore = 0;
            stack.reverse().forEach(c => {
                completeTotalScore = completeTotalScore * 5 + scoresMap2[c];
            });
            completeTotalScores.push(completeTotalScore);
        }
    });
    let result2 = completeTotalScores.sort((a, b) => a - b)[Math.floor(completeTotalScores.length / 2)];
    console.log('Part II:', result2);
});