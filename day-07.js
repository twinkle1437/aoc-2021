const fs = require('fs');

fs.readFile('./data/day-7-whales-treachery.txt', 'utf8', (err, data) => {
    if (err) console.log(err);

    // Data Structure
    const raw = data.split(',');
    const positions = raw.map(p => +p);
    const sorted = positions.sort((a, b) => a - b);
    const freqMap = new Map();
    sorted.forEach(p => {
        if (freqMap.get(p)) {
            let freq = freqMap.get(p);
            freqMap.set(p, ++freq);
        } else {
            freqMap.set(p, 1);
        }
    });

    // Part I
    const result1 = findMinFuel(freqMap);
    console.log('Part I:', result1);

    function findMinFuel(freqMap) {
        let min = 0;
        freqMap.forEach((f1, p1) => {
            let sum = 0;
            freqMap.forEach((f2, p2) => {
                sum += Math.abs(p2 - p1) * f2
            });
            if (min === 0 || sum < min) {
                min = sum
            }
        })
        return min;
    }

    // Part II
    const result2 = findMinFuel2(freqMap);
    console.log('Part II:', result2);

    function findMinFuel2(freqMap) {
        let min = 0;
        freqMap.forEach((f1, p1) => {
            let sum = 0;
            freqMap.forEach((f2, p2) => {
                sum += stepFuel(p1, p2) * f2
            });
            if (min === 0 || sum < min) {
                min = sum
            }
        })
        return min;
    }

    function stepFuel(p1, p2) {
        return (1 + Math.abs(p1 - p2)) * Math.abs(p1 - p2) / 2
    }
});