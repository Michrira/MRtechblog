// Define an async function to handle the comment form submission
const commentFormHandler = async (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the value of the comment input field and trim any leading/trailing whitespace
    const { value: comment_text } = document.querySelector('textarea[name="comment-body"]');

    // Extract the post ID from the current URL
    const post_id = window.location.toString().split('/').pop();

    // If the comment field is not empty
    if (comment_text) {
        // Send a POST request to the comments API with the post ID and comment text as JSON data
        const response = await fetch('/api/comments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ post_id, comment_text })
        });

        // If the request was successful, reload the page to show the new comment
        if (response.ok) {
            document.location.reload();
        } else {
            // Otherwise, display an error message with the status text
            alert(response.statusText);
        }
    }
};

// Attach the comment form submission event listener to the form element with class 'comment-form'
document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);
