//async function https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
//"async and await keywords enable asynchronous, promise-based behavior to be written in a cleaner style, avoiding the need to explicitly configure promise chains." MDN Web Docs
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/async_function name, param, statement
async function commentFormHandler(event) {
    event.preventDefault();

    const comment_text = document.querySelector('textarea[name="comment-body"]').value.trim();

    const post_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

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
//if else true false boolean "if true return... if false return..."
        if (response.ok) {
            document.location.reload();
        } else {
            //https://developer.mozilla.org/en-US/docs/Web/API/Response/status
            //status read-only property of the Response interface contains the status code of the response 
            alert(response.statusText);
        }
    }
}
//listen for the submit button 0
document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);