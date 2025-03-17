// 1
let sum = 0;
let num = 1;

while (num <= 50) {
    sum += num;
    num++;
}

console.log("Сума перших 50 натуральних чисел:", sum);

// 2
function factorial(num) {
    if (num < 0) return "Факторіал не визначений для від'ємних чисел";
    let result = 1;
    for (let i = 1; i <= num; i++) {
        result *= i;
    }
    return result;
}

console.log(factorial(5));

// 3
function getMonth(num) {
    switch (num) {
        case 1: return "Січень";
        case 2: return "Лютий";
        case 3: return "Березень";
        case 4: return "Квітень";
        case 5: return "Травень";
        case 6: return "Червень";
        case 7: return "Липень";
        case 8: return "Серпень";
        case 9: return "Вересень";
        case 10: return "Жовтень";
        case 11: return "Листопад";
        case 12: return "Грудень";
        default: return "Невірний номер місяця";
    }
}

console.log(getMonth(3));

// 4
function sumEvenNumbers(arr) {
    return arr.reduce((sum, num) => num % 2 === 0 ? sum + num : sum, 0);
}

console.log(sumEvenNumbers([1, 2, 3, 4, 5, 6]));

// 5
const countVowels = (str) => {
    const vowels = "аеєиіїоуюяАЕЄИІЇОУЮЯaeiouAEIOU";
    return [...str].filter(char => vowels.includes(char)).length;
};

console.log(countVowels("Привіт, як справи?"));

// 6
function power(base, exponent) {
    return Math.pow(base, exponent);
}

console.log(power(2, 3));