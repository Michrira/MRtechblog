// Define an asynchronous function named editFormHandler that takes an event object as a parameter
async function editFormHandler(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the values of the title and post_content input fields
    const title = document.querySelector('input[name="post-title"]').value;
    const post_content = document.querySelector('textarea[name="post-content"]').value.trim();

    // Get the ID of the current post from the URL
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    // Send a PUT request to the '/api/posts/:id' endpoint with the updated title and post_content data
    const response = await fetch(`/api/posts/${post_id}`, {
        method: 'PUT',
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

// Attach an event listener to the submit event of the form with the class 'edit-post-form'
document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);
