// Handles the delete post functionallity
async function deleteFormHandler(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    // Extract the post ID from the URL using the split method
    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    // Send a DELETE request to the server to delete the post with the given ID
    const response = await fetch(`/api/posts/${post_id}`, {
        method: 'DELETE'
    });
    // If the response is OK, reload the page to reflet the updated post list of the dashboard
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        // IF there is an error, display the status text in an alert message
        alert(response.statusText);
    }
}
// Attach an event listener to the delete post buton to trigger the deleteFormHandler function
document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler);