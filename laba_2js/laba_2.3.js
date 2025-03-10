// 1 if

function getGradeIf(grade) {
    if (grade >= 90) {
        return "Відмінно";
    } else if (grade >= 75) {
        return "Добре";
    } else if (grade >= 60) {
        return "Задовільно";
    } else {
        return "Незадовільно";
    }
}

console.log(getGradeIf(85)); // Добре
console.log(getGradeIf(40)); // Незадовільно

// 1 ?

function getGradeTernary(grade) {
    return (grade >= 90) ? "Відмінно" :
        (grade >= 75) ? "Добре" :
            (grade >= 60) ? "Задовільно" : "Незадовільно";
}

console.log(getGradeTernary(92)); // Відмінно
console.log(getGradeTernary(65)); // Задовільно


// 2 if

function getSeasonIf(month) {
    if (month >= 3 && month <= 5) {
        return "Весна";
    } else if (month >= 6 && month <= 8) {
        return "Літо";
    } else if (month >= 9 && month <= 11) {
        return "Осінь";
    } else {
        return "Зима";
    }
}

console.log(getSeasonIf(4));  // Весна
console.log(getSeasonIf(12)); // Зима

// 2 ?

function getSeasonTernary(month) {
    return (month >= 3 && month <= 5) ? "Весна" :
        (month >= 6 && month <= 8) ? "Літо" :
            (month >= 9 && month <= 11) ? "Осінь" : "Зима";
}

console.log(getSeasonTernary(7));  // Літо
console.log(getSeasonTernary(10)); // Осінь
