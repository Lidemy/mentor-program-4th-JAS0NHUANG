## Fetch()
Use it. You will eventually fetch it!

### AJAX

Two ways to send AJAX request:
1. XMLHttpRequest
2. fetch
Only these two ways.  
Others are just packages depends on them. Ex: jQuery, ajax, [axios](https://github.com/axios/axios/blob/master/dist/axios.js)...

API testing site: [Mocky](https://designer.mocky.io/)

### fetch()

```
fetch('https://the.site.you.wanna.fetch')
```
DONE! We just sent a get request to 'https://the.site.you.wanna.fetch'. But how do we get the result? Let's first try to see what it returns to us. 
```
const result = fetch('https://the.site.you.wanna.fetch')
console.log(result)
```
It shows a `promise` object in the console.

### Promise
What is a promise and how to use it? 
Promise is a type of object. It will return an asynchronus operation's result. 
We can use `.then()` to get the result and process it with the function inside `.then()`.
So how do we work with the returned promise object from fetch?

```
function printResponse(response) {
  console.log(response)
}
const result = fetch('https://the.site.you.wanna.fetch')
result.then(printResponse)
```

```
fetch('https://the.site.you.wanna.fetch')
  .then( response => {
    console.log(response)
  })
```

But if we want to log out `response.body` it will give us a `ReadableStream` whitch we don't know how to treat it (I don't know anyways).  

### Promise, then promise, then promise
To be able to get the response body we need to use the `.text()` function provided on the `response`.

```
fetch('https://the.site.you.wanna.fetch')
  .then( response => {
    console.log(response.text())
  })
```

This will log out ANOTHER promise! So what can we do? YES, `.then()` again.
```
fetch('https://the.site.you.wanna.fetch')
  .then( response => {
    response.text()
      .then(text => {
        console.log(text)
      })
  })
```
Finaly we got the response body logged out.
We can replace `.text()` with `.json()` to get the data parsed into JSON object:
```
fetch('https://the.site.you.wanna.fetch')
  .then( response => {
    response.json()
      .then(json => {
        console.log(json)
      })
  })
```
But we might still send ourselves into a `.then()` hell like in the callback hell:  
```
promise
  .then(result1 => {
    result1.function1()
      .then(result2 => {
        result2.function2()
          .then(result3 => {
            ......
          })
      })
  })
```

### Chaining
```
fetch('https://the.site.you.wanna.fetch')
  .then( response => {
    return response.json()
  })
  .then(json => {
    console.log(json)
  })
```
The returned value of `.then()` can also be a promise!

(Like the chaining in jQuery.)

If the preveious `.then()` returns a promise, the next `.then()` can get the parsed result of that promise. (Oh my god! Toungh twister...)

### Handeling Errors
Only when we can't FETCH any response. Status 4XX or  5XX are not errors.

How do we handel the errors:
```
fetch(api)
  .then(response =>{
    XXXXX
  })
  .catch(error =>{
    console.log("Error", error)
  })
```

### POST with fetch()
The first parameter in `fetch()` is the URL, the second one is an optional object to provide some more informatin such as request body, header, method...etc.
If we want to send a post request:

```
fetch(apiURL, {
  method: 'POST',
  headers: {
    'content-type': 'application/json'
  },
  body: JSON.stringify(data)
})
```
(Seems like we don't need to write `headers: new Headers({})`.)
One thing about body is that we are sending "raw data", so we need to do `JSON.stringify()` if we want to send JSON data. We might need to use other function for other body data(form data, XML...etc).

### Credential
Cross origin request will not include the cookies. If we want to send the cookie with our request, we need to add one line inside the setting block:
```
credentials: 'include'
```

### mode: 'no-cors'?
Can we bypass the CORS limitation? No, we can't. 
We are just telling the browser that we expect the response to be empty.

References:  
https://javascript.info/fetch
https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API