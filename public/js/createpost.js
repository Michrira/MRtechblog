// Define an asynchronous function named createPostHandler that takes an event object as a parameter
async function createPostHandler(event) {
    event.preventDefault();

    // Redirect the user to the "new post" page on the dashboard
    document.location.replace('/dashboard/new');
}

// Attach an event listener to the "click" event of the element with the ID "create-new-post"
document.querySelector('#create-new-post').addEventListener('click', createPostHandler);
