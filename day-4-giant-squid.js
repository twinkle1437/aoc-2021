const fs = require('fs');

fs.readFile('./data/day-4-giant-squid.txt', 'utf8', (err, data) => {
    if (err) console.log(err);

    // Data Structure
    const raw = data.split(/\r?\n/);
    const marks = raw[0].split(',').map(mark => +mark);
    let arrays = [];
    for (let i = 2; i < raw.length; i = i + 6) {
        let array = [];
        for (let j = i; j < i + 5; j++) {
            array.push(raw[j].split(' ').filter(n => n !== ''));
        }
        arrays.push(array);
    }

    // Part I
    let arrays1 = arrays.map(arr => {
        return arr.map(a => a.slice()).slice();
    });
    marks.every(mark => {
        let result = null;
        markNumber(arrays1, mark);
        arrays1.every(arr => {
            result = checkWinner(arr);
            if (result) {
                console.log('Mark:', mark);
                const unmarked = getUnmarked(arr);
                console.log('Unmarked:', unmarked);
                const sumUnmarked = unmarked.reduce(sum, 0);
                console.log('Part I:', mark * sumUnmarked);
                return false;
            }
            return true;
        });
        if (result) {
            return false;
        } else {
            return true;
        }
    });

    // Part II
    let winIdx = [];
    let arrays2 = arrays.map(arr => {
        return arr.map(a => a.slice()).slice();
    });
    marks.every(mark => {
        let final = null;
        markNumber(arrays2, mark);
        arrays2.every((arr, i) => {
            result = checkWinner(arr);
            if (result) {
                if (!winIdx.includes(i)) {
                    winIdx.push(i);
                }
                if (winIdx.length === arrays2.length) {
                    final = arrays2[winIdx[winIdx.length - 1]];
                    console.log('Mark 2:', mark);
                    const unmarked2 = getUnmarked(final);
                    console.log('Unmarked 2:', unmarked2);
                    const sumUnmarked2 = unmarked2.reduce(sum, 0);
                    console.log('Part II:', mark * sumUnmarked2);
                    return false;
                }
            }
            return true;
        });
        if (final) {
            return false;
        } else {
            return true;
        }
    });
});

function checkWinner(arr) {
    let complete = null;
    for (let i = 0; i < arr.length; i++) {
        let x = true,
            y = true,
            row = [],
            col = []
        for (let j = 0; j < arr[i].length; j++) {
            row.push(arr[i][j]);
            col.push(arr[j][i]);
            if (!arr[i][j].endsWith('m')) {
                x = false;
            }
            if (!arr[j][i].endsWith('m')) {
                y = false;
            }
        }
        if (x) {
            complete = row;
            break;
        }
        if (y) {
            complete = col;
            break;
        }
    }
    return complete;
}

function markNumber(arrays, mark) {
    arrays.forEach(array => {
        array.forEach(numbers => {
            numbers.forEach((num, i, self) => {
                if (parseInt(num) === mark) {
                    self[i] += 'm';
                }
            })
        });
    });
}

function getUnmarked(arr) {
    let unmarked = [];
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (!arr[i][j].endsWith('m')) {
                unmarked.push(parseInt(arr[i][j]));
            }
        }
    }
    return unmarked;
}

function sum(a, b) {
    return a + b;
}