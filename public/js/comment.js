// Function to handle the form submission when adding a comment
async function commentFormHandler(event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Get the comment text from the form input
    const comment_text = document.querySelector('textarea[name="comment-body"]').value.trim();

    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    // If the comment is not empty, send a request to create a new comment with
    if (comment_text) {
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({
                post_id,
                comment_text
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        // If the request is succcessful, reload the page to show the new comment
        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
}
// Add an event listener to the comment form to handle form submission
document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);