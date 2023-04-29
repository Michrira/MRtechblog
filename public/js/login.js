const loginFormHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (!email || !password) {
        return alert('Please enter an email and password');
    }

    try {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        document.location.replace('/dashboard');
    } catch (err) {
        alert(err.message);
    }
};

const signupFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (!username || !email || !password) {
        return alert('Please enter a username, email, and password');
    }

    try {
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({ username, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        document.location.replace('/dashboard');
    } catch (err) {
        alert(err.message);
    }
};

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
