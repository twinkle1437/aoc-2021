const fs = require('fs');

fs.readFile('./data/day-6-lanternfish.txt', 'utf8', (err, data) => {
    if (err) console.log(err);

    // Data Structure
    const raw = data.split(',');
    let fishes = raw.map(d => +d);
    let freqMap = [];
    for (let i = 0; i <= 8; i++) {
        freqMap[i] = 0;
    }
    fishes.forEach(f => {
        freqMap[f]++;
    })

    // Part I
    let result1 = part1(fishes, 0);
    console.log('Part I:', result1);

    // Part II
    let result2 = 0;
    let resultMap = part2(freqMap, 256);
    resultMap.forEach(result => { result2 += result });
    console.log('Part II:', result2);

    function part1(fishes, d) {
        d++;
        let children = [],
            self = 6,
            child = 8;
        for (let i = 0; i < fishes.length; i++) {
            if (fishes[i] === 0) {
                fishes[i] = self;
                children.push(child);
            } else {
                fishes[i]--;
            }
        }
        fishes = fishes.concat(children);
        if (d === 80) {
            return fishes.length;
        } else {
            return part1(fishes, d);
        }
    }

    function part2(freqMap, days) {
        for (let i = 0; i < days; i++) {
            let newFreqMap = [0, 0, 0, 0, 0, 0, 0, 0, 0];
            freqMap.forEach((freq, j) => {
                if (j === 0) {
                    newFreqMap[6] += freqMap[j];
                    newFreqMap[8] = freqMap[j];
                } else {
                    newFreqMap[j - 1] += freqMap[j];
                }
            });
            freqMap = newFreqMap;
        }
        freqMap.map(num => Number(num));
        return freqMap.map(num => Number(num));
    }
});