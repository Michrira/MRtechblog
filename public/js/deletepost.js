// Define an asynchronous function to handle deleting a post
const deleteFormHandler = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    // Get the ID of the post to delete from the URL
    const post_id = window.location.pathname.split('/').pop();

    // Send a DELETE request to the API to delete the post with the given ID
    const response = await fetch(`/api/posts/${post_id}`, { method: 'DELETE' });

    // If the response is successful, redirect the user to the dashboard
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        // If the response is not successful, display an error message
        alert(response.statusText);
    }
};

// Attach the deleteFormHandler function to the click event of the delete button
document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler);
