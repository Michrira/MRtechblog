// define an asynchronous function to handle form submission
const editFormHandler = async (event) => {
    event.preventDefault();

    // get the values of the post title and content inputs
    const { value: title } = document.querySelector('input[name="post-title"]');
    const { value: post_content } = document.querySelector('textarea[name="post-content"]');

    // extract the post ID from the current URL
    const post_id = window.location.pathname.split('/').pop();

    // send a PUT request to the server with the updated post data
    const response = await fetch(`/api/posts/${post_id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, post_content })
    });

    // if the response is successful, redirect the user to the dashboard
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        // if there was an error, show an alert with the error message
        alert(response.statusText);
    }
};

// attach the editFormHandler function to the submit event of the form
document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);
