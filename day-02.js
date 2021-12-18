const fs = require('fs');

fs.readFile('./data/day-2-dive.txt', 'utf8', (err, data) => {
    if (err) console.log(err);

    // Data Structure
    const raw = data.split(/\r?\n/);
    let directions = [];
    raw.forEach(dirString => {
        let dirArr = dirString.split(' ');
        let dirObj = {};
        dirObj[dirArr[0]] = +dirArr[1];
        directions.push(dirObj);
    });

    // Part I
    let x = 0,
        y = 0,
        result1 = 0;
    directions.forEach(dir => {
        if (dir['forward']) x += dir['forward'];
        if (dir['down']) y += dir['down'];
        if (dir['up']) y -= dir['up'];
    });
    result1 = x * y;
    console.log('x:', x);
    console.log('y:', y);
    console.log('Part I:', result1);

    // Part II
    let aim = 0,
        h = 0,
        d = 0,
        result2 = 0;
    directions.forEach(dir => {
        if (dir['down']) aim += dir['down'];
        if (dir['up']) aim -= dir['up'];
        if (dir['forward']) {
            h += dir['forward'];
            d += dir['forward'] * aim;
        }
    });
    result2 = h * d;
    console.log('h:', h);
    console.log('d:', d);
    console.log('Part II:', result2);
});