// Define an asynchronous function to handle logging out
const logout = async () => {
    // Send a POST request to the server to log the user out
    const response = await fetch('/api/users/logout', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    // If the server responds with a 200 status code (OK),
    // redirect the user to the homepage
    if (response.ok) {
        document.location.replace('/');
    } else {
        // Otherwise, display an error message
        alert(response.statusText);
    }
}

// Attach the logout function to the click event of the logout button
document.querySelector('#logout').addEventListener('click', logout);
