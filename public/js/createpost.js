// Define a function to handle the "create post" button click event
const createPostHandler = () => {
    // Redirect to the "new post" page on the dashboard
    document.location.replace('/dashboard/new');
};

// Attach the createPostHandler function to the "click" event of the "create new post" button
document.querySelector('#create-new-post').onclick = createPostHandler;
