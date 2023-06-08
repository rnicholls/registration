document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('#registration-form');
  const nameInput = document.querySelector('#name');
  const emailInput = document.querySelector('#email');
  const passwordInput = document.querySelector('#password');
  const confirmPasswordInput = document.querySelector('#confirm-password');
  const thankYou = document.querySelector('#thank-you');

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

    if (document.querySelectorAll('.error-message').length > 0) {
      return;
    }

    // Form validation successful, do further processing or submit the form
    console.log('Form submitted successfully!');
    
    fetchpost(e);
  });

  function fetchpost(e) {
    // (A) GET FORM DATA
    var data = new FormData(e.currentTarget);

    // (B) FETCH
    fetch(e.currentTarget.action, { method: 'post', body: data })
    .then(res => res.text())
    .then(txt => {
      // do something when server responds
      console.log(txt);
      form.classList.add('hidden');
      thankYou.classList.remove('hidden');
    })
    .catch(err => console.log(err));
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
