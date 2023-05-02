// An asynchronous function that logs the user out when the "Logout" button is clicked
async function logout() {
    // Send a POST request to the "/api/users/logout" route to log the user out
    const response = await fetch('/api/users/logout', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    // If the response is successful, redirect the user to the homepage
    if (response.ok) {
        document.location.replace('/');
    } else {
        // If the response is not successful, display an error message with the status text
        alert(response.statusText);
    }
}

// Add an event listener to the "Logout" button that calls the logout function when clicked
document.querySelector('#logout').addEventListener('click', logout);
