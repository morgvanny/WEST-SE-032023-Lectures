#DOM Events
[Zoom Recording](https://youtu.be/K5WhnNf9pDI)

##Topics

- events and event handling
- callback functions and event listeners
- form with html and javascript
- receiving information from users when onSubmit is triggered
- purpose of event.preventDefault()

## Events

When the user interacts with the DOM, it fires events that trigger an effect in our JavaScript code that can do something. Such as updating the DOM or adding content to the database.

To pick up events, our code must 'listen' for the event. The `addEventListener` method will do just that. It takes 2 arguments, the first is the event it's listening for, and the second is the function that will run once the event is triggered.

```js
div.addEventListener("click", () => console.log("hi"));

// When events are triggered, the event object is passed as an argument
// to the event handler function (the callback passed as the second arg to addEventListener)
div.addEventListener("click", (e) => console.log(e));
```

There are many event types: [Events](https://developer.mozilla.org/en-US/docs/Web/Events)

## Forms

Forms can have a variety of user inputs users can interact with.
The submit event can be used to retrieve the value of those inputs.

When a form submits, it will, by default, try to send a request and refresh the page. To prevent that, we need to call e.preventDefault(). Afterward, the event can be used to grab the form values through the target attribute.

```html
<form>
  <input type="text" name="favColor" />
  <input type="submit" />
</form>
```

```js
form.addEventListener("submit", (e) => {
  e.preventDefault();
  //Here we are using the name property from the form to target the specific input.
  console.log(e.target.faveColor.value);
});
```
