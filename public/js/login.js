// This function is called when the login form is submitted
async function loginFormHandler(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    // Get the values entered by the user for email, username and password
    const email = document.querySelector('#email-login').value.trim();
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
    // If both username and password are etnered
    if (username && password) {
        // Send a POST request to the server to log in the user
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                email,
                username,
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // If the login is successful, redirect to the dashboard
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            // Otherwise, show an error message
            alert(response.statusText);
        }
    }
}
// Add an event listener to the login form's submit button
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);