// Function to handle the form submission for creating a new post
async function newFormHandler(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get the values from the input fields
    const title = document.querySelector('input[name="post-title"]').value;
    const post_content = document.querySelector('textarea[name="post-content"]').value.trim();

    // Send a POST request to create a new post
    const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            post_content
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    // If the response is successful, redirect to the dashboard
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        // If the response is not successful, display an error message
        alert(response.statusText);
    }
}

// Add an event listener to the new post form submission
document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);
