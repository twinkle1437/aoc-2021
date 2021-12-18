const fs = require('fs');

fs.readFile('./data/day-3-binary-diagnostic.txt', 'utf8', (err, data) => {
    if (err) console.log(err);

    // Data Structure
    const raw = data.split(/\r?\n/);
    let map = buildMap(raw);

    // Part I
    let gamma = '',
        epsilon = '',
        result1 = 0;
    map.forEach(bitArr => {
        const half = bitArr.length / 2;
        if (bitArr.filter(bit => bit === 1).length > half) {
            gamma += '1';
            epsilon += '0';
        } else {
            gamma += '0';
            epsilon += '1';
        }
    })
    console.log('gamma:', gamma);
    console.log('epsilon:', epsilon);
    result1 = parseInt(gamma, 2) * parseInt(epsilon, 2);
    console.log('Part I:', result1);

    // Part II
    let oxygen = [...raw],
        oxygenMap = map,
        co2 = [...raw],
        co2Map = map,
        result2 = 0;

    oxygen = filterOxygen(oxygen, oxygenMap, 0);
    co2 = filterCo2(co2, co2Map, 0);

    console.log('oxygen:', oxygen[0]);
    console.log('co2:', co2[0]);
    result2 = parseInt(oxygen[0], 2) * parseInt(co2[0], 2);
    console.log('Part II:', result2);

    /*****************  Helpers *******************/
    function buildMap(raw) {
        let map = [];
        raw.forEach(bin => {
            [...bin].forEach((bit, i) => {
                if (map[i]) {
                    map[i].push(+bit);
                } else {
                    map[i] = [+bit];
                }
            })
        });
        return map;
    }

    function filterOxygen(oxygen, oxygenMap, i) {
        if (oxygen.length === 1) {
            return oxygen;
        }
        let bitArr = oxygenMap[i];
        let half = bitArr.length / 2;
        if (bitArr.filter(bit => bit === 1).length >= half) {
            oxygen = oxygen.filter(bin => bin.charAt(i) === '1');
        } else {
            oxygen = oxygen.filter(bin => bin.charAt(i) === '0');
        }
        oxygenMap = buildMap(oxygen);
        i++
        return filterOxygen(oxygen, oxygenMap, i);
    }

    function filterCo2(co2, co2Map, i) {
        if (co2.length === 1) {
            return co2;
        }
        let bitArr = co2Map[i];
        let half = bitArr.length / 2;
        if (bitArr.filter(bit => bit === 1).length >= half) {
            co2 = co2.filter(bin => bin.charAt(i) === '0');
        } else {
            co2 = co2.filter(bin => bin.charAt(i) === '1');
        }
        co2Map = buildMap(co2);
        i++
        return filterCo2(co2, co2Map, i);
    }
});