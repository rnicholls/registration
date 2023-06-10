document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registration-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
    const thankYou = document.getElementById('thank-you');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        clearErrorMessages();

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
        const confirmPassword = confirmPasswordInput.value.trim();

        if (!validateName(name)) {
            showError(nameInput, 'Please enter a valid name.');
        }

        if (!validateEmail(email)) {
            showError(emailInput, 'Please enter a valid email address.');
        }

        if (!validatePassword(password)) {
            showError(passwordInput, 'Please enter a valid password (at least 8 characters, one uppercase, one lowercase, one digit).');
        }

        if (password !== confirmPassword) {
            showError(confirmPasswordInput, 'Passwords do not match.');
        }

        if (!validateName(name) || !validateEmail(email) || !validatePassword(password) || password !== confirmPassword) {
            return;
        }

        fetchpost(e);
    });

    function fetchpost(e) {
        // (A) GET FORM DATA
        const data = new FormData(e.currentTarget);

        // (B) FETCH
        fetch(e.currentTarget.action, { method: 'post', body: data })
            .then(res => res.text())
            .then(() => {
                // do something when server responds
                form.classList.add('hidden');
                thankYou.classList.remove('hidden');
            })
            .catch(() => {});
        // (C) PREVENT HTML FORM SUBMIT
        return false;
    }

    function validateName(name) {
        return /^[a-zA-Z]+$/.test(name);
    }

    function validateEmail(email) {
        // Basic email validation, can be improved
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function validatePassword(password) {
        // Password must contain at least 8 characters, one uppercase, one lowercase, one digit
        return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/.test(password);
    }

    function showError(input, message) {
        const formGroup = input.parentElement;
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message';
        errorMessage.innerText = message;
        formGroup.appendChild(errorMessage);
        input.classList.add('error');
    }

    function clearErrorMessages() {
        document.querySelectorAll('.error-message').forEach(e => e.remove());
    }
});
