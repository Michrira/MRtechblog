//async function https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
//"async and await keywords enable asynchronous, promise-based behavior to be written in a cleaner style, avoiding the need to explicitly configure promise chains." MDN Web Docs
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/async_function name, param, statement
async function newFormHandler(event) {
    event.preventDefault();

    //https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector element = document.querySelector(selectors);
    const title = document.querySelector('input[name="post-title"]').value;
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim and https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trimEnd
    //"removes whitespace from both ends of a string" 
    const post_content = document.querySelector('textarea[name="post-content"]').value.trim();

    //Fetch https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    //Response https://developer.mozilla.org/en-US/docs/Web/API/Response
    //https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
    //https://developer.mozilla.org/en-US/docs/Web/API/fetch "fetch a resource from the network, return a promise which is fulfilled once the response is available"
    const response = await fetch(`/api/posts`, {
        method: 'POST',
        body: JSON.stringify({
            title,
            post_content
        }),
        //https://developer.mozilla.org/en-US/docs/Web/API/Headers Headers interface of the Fetch API allows changes to and action on response header
        headers: {
            'Content-Type': 'application/json'
        }
    });

    //boolean value if then - or basically true or false https://developer.mozilla.org/en-US/docs/Web/API/Response/ok
//https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/Control_flow/if...else
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert(response.statusText);
    }
}

//https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector Document.querySelector()
// Document method querySelector() - returns first Element in the doc that matches specified selector or group of - no matches = null is returned.
//EventListener.handleEvent() = function that is called whenever an event of the specified type occurs. https://developer.mozilla.org/en-US/docs/Web/API/EventListener
document.querySelector('.new-post-form').addEventListener('submit', newFormHandler);