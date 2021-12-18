const fs = require('fs');

fs.readFile('./data/day-1-sonar-sweep.txt', 'utf8', (err, data) => {
    if (err) console.log(err);
    // Data Structure
    const raw = data.split(/\r?\n/);
    const numbers = raw.map(line => parseInt(line));

    // Part I
    let result1 = 0;
    for (let i = 1; i <= numbers.length; i++) {
        if (numbers[i] > numbers[i - 1]) {
            result1++;
        }
    }
    console.log('Part I:', result1);

    // Part II
    let result2 = 0;
    for (let j = 0; j < numbers.length - 3; j++) {
        let sum1 = numbers[j] + numbers[j + 1] + numbers[j + 2];
        let sum2 = numbers[j + 1] + numbers[j + 2] + numbers[j + 3];
        if (sum2 > sum1) {
            result2++;
        }
    }
    console.log('Part II:', result2);
});