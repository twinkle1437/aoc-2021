const fs = require('fs');
const _ = require('lodash');

fs.readFile('./data/day-14.txt', 'utf8', (err, data) => {
    if (err) console.log(err);

    // Data Structure
    const raw = data.split(/\r?\n/);
    let polyTemp = raw[0];
    let polyCountMap = _.countBy(polyTemp.split(''));
    const rulesMap = {};
    raw.filter((r, i) => i > 1).forEach(line => {
        let rule = line.split(' -> ');
        rulesMap[rule[0]] = rule[1];
    });

    // Part I
    const polymer = polymerization(polyTemp, 10);
    const countMap = getCountMap(polymer);
    const sortedCounts = Object.values(countMap).sort((a, b) => b - a);
    const result1 = sortedCounts[0] - sortedCounts[sortedCounts.length - 1];
    console.log('Part I:', result1);

    function polymerization(temp, step) {
        step--;
        let newTemp = temp.charAt(0),
            tempArr = temp.split('');
        for (let cur = 1; cur < temp.length; cur++) {
            let pair = tempArr[cur - 1] + tempArr[cur];
            let newElement = rulesMap[pair];
            newTemp += newElement + tempArr[cur];
        }
        if (step === 0) {
            return newTemp;
        } else {
            return polymerization(newTemp, step);
        }
    }

    function getCountMap(temp) {
        let countMap = {};
        let tempArr = temp.split('');
        tempArr.forEach(e => {
            if (countMap[e]) {
                countMap[e]++;
            } else {
                countMap[e] = 1;
            }
        });
        return countMap;
    }

    // Part II
    const countMap2 = polymerization2(polyTemp, polyCountMap, 40);
    const sortedCounts2 = Object.values(countMap2).sort((a, b) => b - a);
    const result2 = sortedCounts2[0] - sortedCounts2[sortedCounts2.length - 1];
    console.log('Part II:', result2);

    function polymerization2(polyTemp, polyCountMap, step) {
        let pairs = {}
        for (let i = 0; i < polyTemp.length - 1; i++) {
            let pair = polyTemp.substring(i, i + 2);
            if (pairs[pair]) {
                pairs[pair]++;
            } else {
                pairs[pair] = 1;
            }
        }
        while (step > 0) {
            step--;
            let newPairs = {};
            _.forEach(pairs, (value, key) => {
                newPairs[key.charAt(0) + rulesMap[key]] ?
                    newPairs[key.charAt(0) + rulesMap[key]] += value :
                    newPairs[key.charAt(0) + rulesMap[key]] = value;

                newPairs[rulesMap[key] + key.charAt(1)] ?
                    newPairs[rulesMap[key] + key.charAt(1)] += value :
                    newPairs[rulesMap[key] + key.charAt(1)] = value;

                polyCountMap[rulesMap[key]] ?
                    polyCountMap[rulesMap[key]] += value :
                    polyCountMap[rulesMap[key]] = value;
            });
            pairs = newPairs;
        }
        return polyCountMap;
    }
});