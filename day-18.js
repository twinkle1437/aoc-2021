const fs = require('fs');

fs.readFile('./data/day-18.txt', 'utf8', (err, data) => {
    if (err) console.log(err);

    // Data Structure
    const raw = data.split(/\r?\n/);
    const ALL_ARRAYS_REGEX = /\[(\d+),(\d+)\]/g;
    const FIRST_DIGIT_REGEX = /(\d+)/;
    const DOUBLE_DIGITS_REGEX = /\d\d+/g;

    // Part I
    let resultLine1 = raw.reduce((line1, line2) => {
        let line = add(line1, line2);
        global: while (true) {
            for (const match of line.matchAll(ALL_ARRAYS_REGEX)) {
                const depth = getDepth(line, match.index);
                if (depth >= 4) {
                    line = explode(line, match);
                    continue global;
                }
            }
            for (const match of line.matchAll(DOUBLE_DIGITS_REGEX)) {
                line = split(line, match);
                continue global;
            }
            break;
        }
        return line;
    });
    let resultArray1 = JSON.parse(resultLine1);
    let result1 = magnitude(resultArray1);
    console.log('Part I:', result1);

    // Part II
    let resultMax = 0;
    for (let i = 0; i < raw.length - 1; i++) {
        for (let j = i + 1; j < raw.length; j++) {
            let line1 = raw[i],
                line2 = raw[j];
            resultMax = Math.max(resultMax, magnitude(JSON.parse(reduce(line1, line2))), magnitude(JSON.parse(reduce(line2, line1))));
        }
    }
    console.log('Part II:', resultMax);

    function reduce(line1, line2) {
        let line = add(line1, line2);
        global: while (true) {
            for (const match of line.matchAll(ALL_ARRAYS_REGEX)) {
                const depth = getDepth(line, match.index);
                if (depth >= 4) {
                    line = explode(line, match);
                    continue global;
                }
            }
            for (const match of line.matchAll(DOUBLE_DIGITS_REGEX)) {
                line = split(line, match);
                continue global;
            }
            break;
        }
        return line;
    }

    function add(line1, line2) {
        return `[${line1},${line2}]`;
    };

    function getDepth(line, index) {
        let depth = 0;
        for (let i = 0; i < index; i++) {
            if (line[i] === '[') {
                depth++;
            } else if (line[i] === ']') {
                depth--;
            }
        }
        return depth;
    }

    function explode(line, match) {
        let left = line.slice(0, match.index);
        let right = line.slice(match.index + match[0].length);

        left = left
            .split(',')
            .reverse()
            .join()
            .replace(FIRST_DIGIT_REGEX, (n) => +n + +match[1])
            .split(',')
            .reverse()
            .join();
        right = right.replace(FIRST_DIGIT_REGEX, (n) => +n + +match[2]);

        return `${left}0${right}`;
    }

    function split(line, match) {
        let left = line.slice(0, match.index);
        let right = line.slice(match.index + match[0].length);
        const n = +match[0];
        return `${left}[${Math.floor(n / 2)},${Math.ceil(n / 2)}]${right}`;
    }

    function magnitude(pair) {
        const [a, b] = pair.map((n) => (Array.isArray(n) ? magnitude(n) : n));
        return 3 * a + 2 * b;
    }

});