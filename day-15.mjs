import fs from "fs";
import lodash from 'lodash';
const _ = lodash;
import Heapify from "heapify";

fs.readFile('./data/day-15.txt', 'utf8', (err, data) => {
    if (err) console.log(err);

    // Data Structure
    const raw = data.split(/\r?\n/);
    const N = raw.length;
    const M = raw[0].length;
    let chitons = raw.map(line => {
        return line.split('').map(c => +c);
    });
    const nodeMap = [];
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
            nodeMap.push(`${i},${j}`);
        }
    }
    const adjacent = [
        [0, 1],
        [0, -1],
        [1, 0],
        [-1, 0]
    ];

    // Part I
    let visited = new Set();
    let priorityQueue = new Heapify(10000);
    priorityQueue.push(0, 0);
    while (priorityQueue.size > 0) {
        let nodeVal = priorityQueue.peekPriority();
        let nodeIdx = priorityQueue.pop();
        let node = nodeMap[nodeIdx].split(',').map(num => +num);
        let r = node[0],
            c = node[1];
        if (visited.has(node.toString())) {
            continue;
        }
        visited.add(node.toString());
        if (r === N - 1 && c === M - 1) {
            console.log('result1:', nodeVal);
            break;
        }
        _.forEach(adjacent, adj => {
            let rn = r + adj[0],
                cn = c + adj[1];
            if (chitons[rn] && chitons[rn][cn]) {
                let val = chitons[rn][cn];
                priorityQueue.push(nodeMap.indexOf([rn, cn].join(',')), nodeVal + val);
            }
        });
    }

    // Part II
    const NN = N * 5;
    const MM = M * 5;
    const nodeMap2 = [];
    for (let i = 0; i < NN; i++) {
        for (let j = 0; j < MM; j++) {
            nodeMap2.push(`${i},${j}`);
        }
    }

    function calculateValue(r, c) {
        let x = (chitons[r % N][c % M] +
            ~~(r / N) + ~~(c / M));
        return (x - 1) % 9 + 1
    }

    let visited2 = new Set();
    let priorityQueue2 = new Heapify(250000);
    priorityQueue2.push(0, 0);
    while (priorityQueue2.size > 0) {
        let nodeVal = priorityQueue2.peekPriority();
        let nodeIdx = priorityQueue2.pop();
        let node = nodeMap2[nodeIdx].split(',').map(num => +num);
        let r = node[0],
            c = node[1];
        if (visited2.has(node.toString())) {
            continue;
        }
        visited2.add(node.toString());
        if (r === NN - 1 && c === MM - 1) {
            console.log('result2:', nodeVal);
            break;
        }
        _.forEach(adjacent, adj => {
            let rn = r + adj[0],
                cn = c + adj[1];
            if ((rn >= 0 && rn < NN) && (cn >= 0 && cn < MM)) {
                let val = calculateValue(rn, cn);
                priorityQueue2.push(nodeMap2.indexOf([rn, cn].join(',')), nodeVal + val);
            }
        });
    }
});