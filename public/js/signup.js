// Define an async function to handle the form submission
const signupFormHandler = async (event) => {
    event.preventDefault(); // prevent the default form submission behavior

    // Use FormData to get the form data and extract the email, username, and password fields
    const formData = new FormData(event.target);
    const email = formData.get('email');
    const username = formData.get('username');
    const password = formData.get('password');

    try {
        // Make a POST request to the '/api/users' endpoint with the email, username, and password in the request body
        const response = await fetch('/api/users', {
            method: 'POST',
            body: JSON.stringify({
                email,
                username,
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // If the response is OK, redirect to the dashboard page
        if (response.ok) {
            document.location.replace('/dashboard');
        } else { // Otherwise, display an alert with the status text of the response
            alert(response.statusText);
        }
    } catch (err) { // Catch any errors and display an alert with a generic error message
        console.error(err);
        alert('An error occurred while signing up');
    }
};

// Attach an event listener to the form's submit event and call the signupFormHandler function
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
