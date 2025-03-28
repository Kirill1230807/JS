document.addEventListener("DOMContentLoaded", function() {
    // Цифровий годинник
    function updateClock() {
        const clock = document.getElementById('clock');
        const now = new Date();
        let hours = now.getHours().toString().padStart(2, '0');
        let minutes = now.getMinutes().toString().padStart(2, '0');
        let seconds = now.getSeconds().toString().padStart(2, '0');

        clock.innerHTML = `${hours}:${minutes}:<span class="blink">${seconds}</span>`;
    }

    setInterval(updateClock, 1000);
    updateClock(); // Оновити одразу при завантаженні

    // Таймер зворотного відліку
    function startCountdown() {
        const endTime = document.getElementById("endTime").value;
        if (!endTime) {
            alert("Будь ласка, виберіть дату та час для відліку.");
            return;
        }

        const countdownDisplay = document.getElementById("countdownDisplay");
        const endDate = new Date(endTime);

        const interval = setInterval(function() {
            const now = new Date();
            const timeLeft = endDate - now;

            if (timeLeft <= 0) {
                clearInterval(interval);
                countdownDisplay.textContent = "Таймер завершено!";
            } else {
                const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
                countdownDisplay.textContent = `${days} днів ${hours} годин ${minutes} хвилин ${seconds} секунд`;
            }
        }, 1000);
    }

    // Обчислення часу до дня народження
    function calculateBirthday() {
        const birthdayDate = document.getElementById("birthdayDate").value;
        if (!birthdayDate) {
            alert("Будь ласка, введіть вашу дату народження.");
            return;
        }

        const birthday = new Date(birthdayDate);
        const now = new Date();

        // Якщо дата вже пройшла, додати рік до неї
        if (birthday < now) {
            birthday.setFullYear(birthday.getFullYear() + 1);
        }

        const timeLeft = birthday - now;
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        const birthdayDisplay = document.getElementById("birthdayDisplay");
        birthdayDisplay.textContent = `До вашого дня народження залишилось: ${days} днів, ${hours} годин, ${minutes} хвилин, ${seconds} секунд.`;
    }

    // Календар
    function showCalendar() {
        const monthInput = document.getElementById("monthInput").value;
        const calendarDisplay = document.getElementById("calendarDisplay");

        const month = new Date(monthInput);
        const year = month.getFullYear();
        const monthIndex = month.getMonth();

        const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
        const firstDay = new Date(year, monthIndex, 1).getDay();

        let calendar = `Календар на ${month.toLocaleString('uk-UA', { month: 'long' })} ${year}:\n`;
        calendar += "Пн Вт Ср Чт Пт Сб Нд\n";

        // Додати порожні дні для першого тижня місяця
        for (let i = 0; i < firstDay; i++) {
            calendar += "   ";
        }

        for (let day = 1; day <= daysInMonth; day++) {
            calendar += day.toString().padStart(2, ' ') + " ";
            if ((day + firstDay) % 7 === 0) {
                calendar += "\n";
            }
        }

        calendarDisplay.textContent = calendar;
    }

    // Викликаємо функції
    const countdownButton = document.querySelector("#countdown button");
    const birthdayButton = document.querySelector("#birthday button");
    const calendarButton = document.querySelector("#calendar button");

    countdownButton.addEventListener("click", startCountdown);
    birthdayButton.addEventListener("click", calculateBirthday);
    calendarButton.addEventListener("click", showCalendar);
});
