document.addEventListener("DOMContentLoaded", function () {
    const lights = document.querySelectorAll(".light");
    const statusText = document.getElementById("status");
    const manualSwitch = document.getElementById("manualSwitch");
    const changeDuration = document.getElementById("changeDuration");

    let redTime = 5000, yellowTime = 3000, greenTime = 7000; // Значення за замовчуванням
    let currentIndex = 0;
    let blinking = false;
    let interval;

    // Функція зміни світла
    function changeLight() {
        if (blinking) return; // Не змінюємо під час миготіння

        lights.forEach(light => light.classList.remove("active"));

        if (currentIndex === 0) {
            lights[0].classList.add("active");
            statusText.textContent = "Червоне світло";
            interval = setTimeout(() => nextState(), redTime);
        } else if (currentIndex === 1) {
            lights[1].classList.add("active");
            statusText.textContent = "Жовте світло";
            interval = setTimeout(() => nextState(), yellowTime);
        } else if (currentIndex === 2) {
            lights[2].classList.add("active");
            statusText.textContent = "Зелене світло";
            interval = setTimeout(() => nextState(), greenTime);
        } else if (currentIndex === 3) {
            blinking = true;
            statusText.textContent = "Миготливе жовте світло";
            blinkYellow(3);
        }
    }

    // Функція миготіння жовтого світла
    function blinkYellow(times) {
        let count = 0;
        let blinkInterval = setInterval(() => {
            lights[1].classList.toggle("active");
            count++;
            if (count >= times * 2) {
                clearInterval(blinkInterval);
                blinking = false;
                currentIndex = 0;
                changeLight();
            }
        }, 500);
    }

    // Функція перемикання стану
    function nextState() {
        currentIndex = (currentIndex + 1) % 4;
        changeLight();
    }

    // Функція ручного перемикання світлофора
    manualSwitch.addEventListener("click", () => {
        clearTimeout(interval);
        nextState();
    });

    // Функція зміни тривалості через prompt
    changeDuration.addEventListener("click", () => {
        let newRedTime = parseInt(prompt("Введіть час червоного світла (в мс):", redTime));
        let newYellowTime = parseInt(prompt("Введіть час жовтого світла (в мс):", yellowTime));
        let newGreenTime = parseInt(prompt("Введіть час зеленого світла (в мс):", greenTime));

        if (!isNaN(newRedTime) && newRedTime > 0) redTime = newRedTime;
        if (!isNaN(newYellowTime) && newYellowTime > 0) yellowTime = newYellowTime;
        if (!isNaN(newGreenTime) && newGreenTime > 0) greenTime = newGreenTime;

        alert("Час світлофора змінено!");
    });

    // Запуск світлофора
    changeLight();
});
