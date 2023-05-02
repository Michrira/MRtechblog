// This is an async function that handles the form submission event.
async function signupFormHandler(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    // Get the values of the email, username, and password fields from the form.
    const email = document.querySelector('#email-signup').value.trim();
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    // If all fields have a value, send a POST request to the server to create a new user.
    if (email && username && password) {
        const response = await fetch('/api/users', {
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
        // If the response is successful, redirect the user to the dashboard.
        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            // If the response is not successful, display an error message.
            alert(response.statusText);
        }
    }
}
// This code sets the event listener for the form submission event.
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
