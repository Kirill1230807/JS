document.addEventListener('DOMContentLoaded', function() {
    // Перемикання вкладок
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');

            // Оновлення активної кнопки вкладки
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            // Оновлення активного вмісту вкладки
            tabContents.forEach(content => content.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Перемикач для відображення пароля у виді тексту
    document.querySelectorAll('.toggle-password').forEach(toggle => {
        toggle.addEventListener('click', function() {
            const passwordInput = this.previousElementSibling;
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
            this.textContent = type === 'password' ? '👁️' : '🙈';
        });
    });

    // Вибір країни та міста
    const countrySelect = document.getElementById('country');
    const citySelect = document.getElementById('city');

    const citiesByCountry = {
        'Ukraine': ['Київ', 'Львів', 'Одеса', 'Харків', 'Дніпро'],
        'Poland': ['Варшава', 'Краків', 'Гданськ', 'Вроцлав', 'Познань'],
        'Germany': ['Берлін', 'Мюнхен', 'Гамбург', 'Кельн', 'Франкфурт']
    };

    countrySelect.addEventListener('change', function() {
        citySelect.disabled = !this.value;
        citySelect.innerHTML = '<option value="">-- Виберіть місто --</option>';

        if (this.value) {
            citiesByCountry[this.value].forEach(city => {
                const option = document.createElement('option');
                option.value = city;
                option.textContent = city;
                citySelect.appendChild(option);
            });
        }
    });

    // Валідація поля
    function validateField(field, regex = null, customValidation = null) {
        const value = field.value.trim();
        const formGroup = field.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');

        if (field.required && !value) {
            showError(field, errorElement, 'Це поле обов\'язкове');
            return false;
        }

        if (regex && value && !regex.test(value)) {
            showError(field, errorElement, getErrorMessage(field));
            return false;
        }

        if (customValidation && !customValidation(field)) {
            return false;
        }

        showSuccess(field, errorElement);
        return true;
    }

    // Валідація полів імені
    function validateNameField(field) {
        const value = field.value.trim();
        const formGroup = field.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');

        if (field.required && !value) {
            showError(field, errorElement, 'Це поле обов\'язкове');
            return false;
        }

        if (value.length < 3 || value.length > 15) {
            showError(field, errorElement, 'Повинно бути від 3 до 15 символів');
            return false;
        }

        const nameRegex = /^[A-Za-zА-Яа-яЁёЇїІіЄєҐґ\s-]+$/;
        if (!nameRegex.test(value)) {
            showError(field, errorElement, 'Допустимі лише літери, дефіс або пробіл');
            return false;
        }

        showSuccess(field, errorElement);
        return true;
    }

    // Перевіряє, чи сходяться паролі
    function validatePasswordMatch() {
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirmPassword');
        const errorElement = confirmPassword.closest('.form-group').querySelector('.error-message');

        if (password.value !== confirmPassword.value) {
            showError(confirmPassword, errorElement, 'Паролі повинні бути однаковими');
            return false;
        }

        showSuccess(confirmPassword, errorElement);
        return true;
    }

    // Повідомляє про помилку, залежно від типу поля
    function getErrorMessage(field) {
        const fieldName = field.labels ? field.labels[0].textContent.replace(':', '') : 'Поле';

        if (field.id === 'email') {
            return 'Будь ласка, введіть дійсну email адресу';
        }

        if (field.id === 'phone') {
            return 'Будь ласка, введіть дійсний номер телефону у форматі +380XXXXXXXXX';
        }

        if (field.id === 'birthDate') {
            return 'Будь ласка, введіть дійсну дату народження';
        }

        return 'Невірне значення';
    }

    // Показ помилки
    function showError(field, errorElement, message) {
        field.classList.add('invalid');
        field.classList.remove('valid');
        if (errorElement) errorElement.textContent = message;
    }

    // Показ успіху
    function showSuccess(field, errorElement) {
        field.classList.add('valid');
        field.classList.remove('invalid');
        if (errorElement) errorElement.textContent = '';
    }

    // Валідація форми авторизації
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;

        isValid = validateField(loginForm.username) && isValid;
        isValid = validateField(loginForm.password) && isValid;

        if (isValid) {
            const formData = new FormData(loginForm);
            const data = Object.fromEntries(formData.entries());

            // Імітація запиту AJAX
            setTimeout(() => {
                document.getElementById('loginSuccess').textContent = 'Ви успішно авторизовані!';
                loginForm.reset();

                loginForm.querySelectorAll('input').forEach(input => {
                    input.classList.remove('valid', 'invalid');
                });
            }, 1000);
        }
    });

    // Валідація форми реєстрації
    const registerForm = document.getElementById('registerForm');
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;

        // Валідація полів
        isValid = validateNameField(registerForm.firstName) && isValid;
        isValid = validateNameField(registerForm.lastName) && isValid;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        isValid = validateField(registerForm.email, emailRegex) && isValid;
        isValid = validateField(registerForm.password) && isValid;
        isValid = validatePasswordMatch() && isValid;

        const phoneRegex = /^\+380\d{9}$/;
        isValid = validateField(registerForm.phone, phoneRegex) && isValid;

        isValid = validateField(registerForm.birthDate, null, field => {
            const birthDate = new Date(field.value);
            const today = new Date();
            const minAgeDate = new Date(today.getFullYear() - 12, today.getMonth(), today.getDate());

            if (birthDate > today) {
                showError(field, field.closest('.form-group').querySelector('.error-message'), 'Дата народження не може бути у майбутньому');
                return false;
            }

            if (birthDate > minAgeDate) {
                showError(field, field.closest('.form-group').querySelector('.error-message'), 'Вам має бути щонайменше 12 років для реєстрації');
                return false;
            }

            return true;
        }) && isValid;

        isValid = validateField(registerForm.sex[0]) && isValid;
        isValid = validateField(registerForm.sex[1]) && isValid;
        isValid = validateField(registerForm.country) && isValid;
        isValid = validateField(registerForm.city) && isValid;

        if (isValid) {
            const formData = new FormData(registerForm);
            const data = Object.fromEntries(formData.entries());

            // Імітація запиту AJAX
            setTimeout(() => {
                document.getElementById('registerSuccess').textContent = 'Ви успішно зареєстровані!';
                registerForm.reset();

                registerForm.querySelectorAll('input, select').forEach(input => {
                    input.classList.remove('valid', 'invalid');
                });

                citySelect.disabled = true;
                citySelect.innerHTML = '<option value="">-- Виберіть місто --</option>';
            }, 1000);
        }
    });

    // Валідація полів форми авторизації, коли ми вийшли з поля вводу
    loginForm.username.addEventListener('blur', function() {
        validateField(this);
    });

    loginForm.password.addEventListener('blur', function() {
        validateField(this);
    });

    // Валідація полів форми реєстрації, коли ми вийшли з поля вводу
    registerForm.firstName.addEventListener('blur', function() {
        validateNameField(this);
    });

    registerForm.lastName.addEventListener('blur', function() {
        validateNameField(this);
    });

    registerForm.email.addEventListener('blur', function() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        validateField(this, emailRegex);
    });

    registerForm.password.addEventListener('blur', function() {
        validateField(this);
    });

    registerForm.confirmPassword.addEventListener('blur', function() {
        validatePasswordMatch();
    });

    registerForm.password.addEventListener('input', function() {
        if (registerForm.confirmPassword.value) {
            validatePasswordMatch();
        }
    });

    registerForm.phone.addEventListener('blur', function() {
        const phoneRegex = /^\+380\d{9}$/;
        validateField(this, phoneRegex);
    });

    registerForm.birthDate.addEventListener('blur', function() {
        validateField(this, null, field => {
            const birthDate = new Date(field.value);
            const today = new Date();
            const minAgeDate = new Date(today.getFullYear() - 12, today.getMonth(), today.getDate());

            if (birthDate > today) {
                return false;
            }

            if (birthDate > minAgeDate) {
                return false;
            }

            return true;
        });
    });

    registerForm.country.addEventListener('change', function() {
        validateField(this);
    });

    registerForm.city.addEventListener('change', function() {
        validateField(this);
    });
});