// Define an asynchronous function named newFormHandler that takes an event object as a parameter
async function newFormHandler(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the values of the title and post_content input fields
    const title = document.querySelector('input[name="post-title"]').value;
    const post_content = document.querySelector('textarea[name="post-content"]').value.trim();

    // Send a POST request to the '/api/posts' endpoint with the title and post_content data
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

    // If the response is OK, redirect the user to the dashboard page
    if (response.ok) {
        document.location.replace('/dashboard');
    } 
    // If the response is not OK, show an alert with the status text
    else {
        alert(response.statusText);
    }
}

// Attach an event listener to the submit event of the form with the class 'new-post-form'
document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);
