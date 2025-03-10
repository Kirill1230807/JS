// 1
function isInRange(num, min, max) {
    return num >= min && num <= max;
}

console.log(isInRange(10, 5, 15)); // true
console.log(isInRange(20, 5, 15)); // false

// 2

function toggleBoolean(value) {
    return !value;
}

console.log(toggleBoolean(true)); // false
console.log(toggleBoolean(false)); // true
