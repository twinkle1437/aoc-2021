const fs = require('fs');

fs.readFile('./data/day-17.txt', 'utf8', (err, data) => {
    if (err) console.log(err);

    // Data Structure
    const [x1, x2, y1, y2] = data.match(/\-?\d+/g).map(Number);
    const maxAbsY = Math.max(Math.abs(y1), Math.abs(y2));

    // Part I
    let result1 = 0;
    for (let x = 1; x <= x2; ++x) {
        for (let y = maxAbsY; y >= -maxAbsY; --y) {
            let xPosition = 0;
            let yPosition = 0;
            let xv = x;
            let yv = y;
            let highest = (y * (y + 1)) / 2
            while (yPosition >= y1) {
                if (xPosition >= x1 && xPosition <= x2 && yPosition >= y1 && yPosition <= y2) {
                    result1 = highest;
                    break;
                }
                xPosition += xv;
                yPosition += yv;
                xv === 0 ? xv : xv -= 1
                yv -= 1;
            }
            if (xPosition < x1) break;
        }
    }
    console.log('Part I:', result1);

    // Part II
    let result2 = 0;
    for (let x = 1; x <= x2; ++x) {
        for (let y = maxAbsY; y >= -maxAbsY; --y) {
            let xPosition = 0;
            let yPosition = 0;
            let xv = x;
            let yv = y;
            while (yPosition >= y1) {
                if (xPosition >= x1 && xPosition <= x2 && yPosition >= y1 && yPosition <= y2) {
                    result2++;
                    break;
                }
                xPosition += xv;
                yPosition += yv;
                xv === 0 ? xv : xv -= 1
                yv -= 1;
            }
            if (xPosition < x1) break;
        }
    }
    console.log('Part II:', result2);
});