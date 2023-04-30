const loginFormHandler = async (event) => {
    event.preventDefault(); // prevent default form submission behavior

    // get the values of email, username, and password input fields
    const emailInput = document.querySelector('#email-login');
    const usernameInput = document.querySelector('#username-login');
    const passwordInput = document.querySelector('#password-login');
    const email = emailInput.value.trim();
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();

    // make sure the username and password fields are not empty
    if (username && password) {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, username, password })
        });

        if (response.ok) {
            // redirect to the dashboard if login is successful
            document.location.replace('/dashboard');
        } else {
            // display an error message if login fails
            alert(response.statusText);
        }
    } else {
        // if either username or password is empty, display an error message
        alert('Please enter both username and password');
    }

    // clear the input fields after submission
    emailInput.value = '';
    usernameInput.value = '';
    passwordInput.value = '';
};

// add event listener to the login form
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
