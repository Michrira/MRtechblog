// Define an asynchronous function named deleteFormHandler that takes an event object as a parameter
async function deleteFormHandler(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

  // Extract the post ID from the URL of the current page
const post_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
];

// Send a DELETE request to the '/api/posts/:id' endpoint with the post ID data
const response = await fetch(`/api/posts/${post_id}`, {
    method: 'DELETE'
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
// Attach an event listener to the click event of the element with the class 'delete-post-btn'
document.querySelector('.delete-post-btn').addEventListener('click', deleteFormHandler);