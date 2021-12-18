const fs = require('fs');

fs.readFile('./data/day-8-seven-segment.txt', 'utf8', (err, data) => {
    if (err) console.log(err);

    // Data Structure
    const raw = data.split(/\r?\n/);

    // Part I
    // 1, 4, 7, 8
    // 1->cf, 4->bcdf, 7->acf, 8->abcdefg
    let result1 = 0,
        lengths = [2, 3, 4, 7];
    let segments1 = [];
    raw.forEach(line => {
        let segs = line.split(' | ')[1].split(' ');
        segments1 = [...segments1, ...segs];
    });
    segments1.forEach(seg => {
        if (lengths.includes(seg.length)) result1++;
    })
    console.log('Part I:', result1);

    // Part II
    // 2 digit -> 1
    // 4 digits -> 4
    // 3 digits -> 7
    // 7 digits -> 8
    // 6 digits -> 0, 6, 9
    // 5 digits -> 2, 3, 5
    // 6: 4 -> 9, 1 -> 6, 0
    // 5: 4 -> 5, 1 -> 3, 2
    let result2 = 0
    raw.forEach(line => {
        let segs = line.split(' | ');
        let input = segs[0].split(' ');
        let output = segs[1].split(' ');
        let segMap = getSegMap(input);
        result2 += getOutput(segMap, output);
    });
    console.log('Part II:', result2);

    function getSegMap(input) {
        let segMap = new Map();
        // Sort input strings
        input = input.map(seg => {
            return seg.split('').sort().join('');
        });

        // Find 1,4,7,8
        input.forEach(seg => {
            if (seg.length === 2) {
                segMap.set(1, seg);
            }
            if (seg.length === 3) {
                segMap.set(7, seg);
            }
            if (seg.length === 4) {
                segMap.set(4, seg);
            }
            if (seg.length === 7) {
                segMap.set(8, seg);
            }
        });

        // Find others
        input.forEach(seg => {
            let char1 = segMap.get(1).split('');
            let char4 = segMap.get(4).split('');
            if (seg.length === 6) {
                if (!seg.includes(char1[0]) || !seg.includes(char1[1])) {
                    segMap.set(6, seg);
                } else if (seg.includes(char4[0]) && seg.includes(char4[1]) && seg.includes(char4[2]) && seg.includes(char4[3])) {
                    segMap.set(9, seg);
                } else {
                    segMap.set(0, seg);
                }
            }
            if (seg.length === 5) {
                if (seg.includes(char1[0]) && seg.includes(char1[1])) {
                    segMap.set(3, seg);
                } else if (containsCount(seg, char4) === 3) {
                    segMap.set(5, seg);
                } else {
                    segMap.set(2, seg);
                }
            }
        });

        return segMap;
    }

    function getOutput(segMap, output) {
        let num = '';
        // Sort output strings
        output = output.map(seg => {
            return seg.split('').sort().join('');
        });
        // Translate output
        output.forEach(out => {
            segMap.forEach((value, key) => {
                if (value === out) {
                    num += key;
                }
            })
        });
        return Number(num);
    }

    function containsCount(seg, char) {
        let count = 0;
        char.forEach(c => {
            if (seg.includes(c)) {
                count++;
            }
        });
        return count;
    }
});