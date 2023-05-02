// Function t handle the submission of an edit post form
async function editFormHandler(event) {
    event.preventDefault();// Prevent the default form submission behavior

    // Get the updated title and content of the post from the form input field
    const title = document.querySelector('input[name="post-title"]').value;
    const post_content = document.querySelector('textarea[name="post-content"]').value.trim();
    // Get the id of the post to be updated from the URL
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    // Send a PUT request to the server with the updated post data
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
    // If the response is successful, redirect to the dashboard
    if (response.ok) {
        document.location.replace('/dashboard');
    // Otherwise, show an error message with the status text    
    } else {
        alert(response.statusText);
    }
}
// Add an event listener to the edit post form to call the editFormHandler funciton when submitted
document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);