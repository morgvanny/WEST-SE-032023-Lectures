#Communicating With the Server
[Part 1 Zoom Recording](https://youtu.be/l-67IDrRMaI)
[Part 2 Zoom Recording]()
##Topics

- request-response cycle
- server vs client
- HTTP Verbs and actions
- GET request using fetch
- async JS and promises
- using .then() and .catch()
- using json-server for a local API prototype
- rendering data in the browser after fetch

## The Web

![request_response](request_response.png)

What happens when you type a URL into the browser?
Your browser makes a request to a server, that server sends some response, and your browser parses and process that data.

Think about when you log into a website like Pinterest or Instagram. You are given an interface full of data curated and unique to you. Have you ever wondered why what when you log in is different from what your friends/family see when they log in? This is because clients can be treated like a template populated with data.

When you log in, the client will return with the basic template of the web page and make requests for data specific to each user.

In JavaScript, we can achieve this through HTTP requests.

## HTTP

"The Hypertext Transfer Protocol (HTTP) is the foundation of the World Wide Web and is used to load web pages using hypertext links. HTTP is an application layer protocol designed to transfer information between networked devices and runs on top of other layers of the network protocol stack. A typical flow over HTTP involves a client machine making a request to a server, which then sends a response message."
[ Cloudflare, "What is HTTP?" 2022](https://www.cloudflare.com/learning/ddos/glossary/hypertext-transfer-protocol-http/)

In other words, HTTP is the language used by the client(browser). The server is used to communicate and exchange responses, including data.

### The Request

A request has HTTP methods (also known as HTTP verbs) defining the kind of request, the address of the request, and sometimes data or headers.

HTTP Methods

GET: requests resources and retrieves data (READ)

POST: sends data to the server (CREATE)

PATCH: Updates part of a resource (UPDATE)

PUT: Updates all of a resource (UPDATE)

DELETE: Deletes a resource (DELETE)

### Fetch & Promise

.fetch() is a method that allows us to create an HTTP request. To Read, CREATE, UPDATE or DELETE resources.
It returns a promise.

When an asynchronous operation happens, a Promise is an object that represents its completion or failure.
It has 3 states, pending, fulfilled, and rejected.

.then() is a method called on a promise and returns a promise.

```
// When given a URL fetch, create an HTTP GET request to the server the URL points to. It returns a promise.
//Once the promise has been fulfilled the response from the server is passed to the .then()
fetch(url)
.then()

// The .then takes a callback
// Within that callback we can parse the response by calling .json() on it.
// .json() also returns a promise so we can chain a .then onto our original .then that will process the data once the promise from the .json() is fulfilled.

fetch(url)
.then(response => {
    //retrives the data from our response
    return response.json()
})
.then(data => console.log(data))

```

GET - reading data
POST - sending new data to be saved
PATCH - updating existing data
DELETE - deleting data
