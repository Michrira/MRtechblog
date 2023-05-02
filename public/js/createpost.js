// This funciton handles the form submission to create a new post
async function addPostHandler(event) {
    event.preventDefault(); // Prevent the default form submission behavior
  
    // Get the values of the title and content inputs
    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();
  
    // Check that both the title and conent are not empty
    if (title && content) {
      // If the inputs are not empty, send a POST request to the server to create a new post
      const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
      });
      // If the POST request is successful, redirect the user to the dashboard page
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        // If the POST request fails, show an alert to the user
        alert('Failed to create post');
      }
    }
  }
  // Add an event listener to the form submit button to trigger the addPOSTHandler function
  document.querySelector('.new-post-form').addEventListener('submit', addPostHandler);
  