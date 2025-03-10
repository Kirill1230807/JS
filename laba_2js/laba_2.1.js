// 1
function findMinMax(arr) {
    return {
        min: Math.min(...arr),
        max: Math.max(...arr)
    };
}
console.log(findMinMax([3, 5, 7, 2, 8]));

// 2
function compareObjects(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
}
console.log(compareObjects({a: 1, b: 2}, {a: 1, b: 2})); // видасть true
console.log(compareObjects({a: 3, b: 2}, {a: 2, b: 1})); // видасть false
