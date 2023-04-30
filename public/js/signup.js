async function signupFormHandler(event) {
    event.preventDefault();
// Get the values of the email, username, and password input fields
    const email = document.querySelector('#email-signup').value.trim();
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
// If all fields are filled out, send a POST request to the '/api/users' endpoint with the email, username, and password data
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
// If the response is OK, redirect the user to the dashboard page
        if (response.ok) {
            document.location.replace('/dashboard');
// If the response is not OK, show an alert with the status text
        } else {
            alert(response.statusText);
        }
    }
}
// Attach an event listener to the submit event of the form with the class 'signup-form'
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);