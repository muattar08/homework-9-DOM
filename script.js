const form = document.querySelector('form');

const pattern = {
    email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    password: /^.{8,}$/ // Упрощённый regex: минимум 8 символов
};

function validate(data) {
    const errors = [];

    for (let key in data) {
        const regex = pattern[key];
        const value = data[key];
        const result = regex.test(value);
        const input = document.querySelector(`input[name="${key}"]`);
        input.classList.remove('valid', 'invalid'); // Сбрасываем классы
        input.classList.add(result ? 'valid' : 'invalid'); // Добавляем нужный класс

        if (!result) {
            errors.push(`${key} is invalid`);
        }
    }

    return errors;
}

// Добавленные три строчки:
document.querySelector('#email').addEventListener('input', () => validate({ email: document.querySelector('#email').value }));
document.querySelector('#password').addEventListener('input', () => validate({ password: document.querySelector('#password').value }));
form.addEventListener('submit', e => e.preventDefault() || validate(Object.fromEntries(new FormData(form))));

form.onsubmit = (e) => {
    e.preventDefault();

    const user = {};
    const fm = new FormData(form);

    fm.forEach((value, key) => {
        user[key] = value;
    });

    const errors = validate(user);

    if (!errors.length) {
        console.log(user);
    }
};