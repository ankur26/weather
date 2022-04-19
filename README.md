# Weather App 

We implement an app with basic weather functionality with a location input, this project is the first where we will be using an API to fetch data and display on the interface, as seen of most applications/websites.

## Concepts learn prior to working on this project.

1. Callback hell and it's implications ( how tracing of code becomes difficult and control is left to external handlers rather than us)
2. Promises, and how it reduces the pain points of Callbacks.
3. Async/await, and the event loop and how async await makes asynchronous code look similar to what is present in a synchronous code.
4. Event loop, main thread, micro tasks and how async code runs in the event loop.
5. The fetch API, how requests were made before fetch came along. What goes in a request and how to consume an API.
6. Public APIs and how to use them, and what limitations are kept on users using certain methods.


## Deployed project link 

[Link](https://weather-muutezskf-ankur26.vercel.app/)

## Challenges faced, and some additions to impress.

1. Autocomplete - I used a list from the Simple Maps World cities and processed it in the index script using the csv loader extension for webpack. This while is a cool feature, it increases the load times of the site by a lot as it has over 40000 city entries.
2. API calls using Promises while very composable it is still a difficult task to syntactically understand them and debug through, this was eased out async await.
3. Faced multiple issues while processing the data and had to require making api calls using Postman to really get a sense of what object was being returned rather than logging it in the console and try to work with it.
4. The webpage is still not good design wise as the topic of focus was to work with an API.

### All in all I am very happy with how the project went and it's still one of my better efforts to date.



