# NetStack
---

### About & Why
Why did I make this?
Jumping onto any new technology, framework or library tto build apps etc is a challenge in itself. 
After a certain while, you hit the blocker that how do we make API calls in this enviroment; because naturally 
you have to consume data from the network at some point.

Eventually you end up watching tutorials and reading documentation, but there is still no structure to it. 
This composable helps to provide you with that structure. 

I'm calling it a composable in general and not just in the terms of NUXT. It is a utility method for you that provides you 
with very granular and precise control over your network calls. 
Let's discuss what's there to offer and you'll know whether 
you need this or not.  


### Features 
#### Network Requests 
`useNetStack` can make network calls for you, in a clean and intuitive manner. It can help you structure your API calls  

### Current Objectives 
#### Error Handling: 
    - [x] Add retry mechanisms
    - [ ] Custom error handling 
    - [x] Cancellation tokens 
#### Timeouts and Caching: 
    - [x] Support request timeouts  
    - [x] Add response caching
#### Logging and Global Config: 
    - [x] Introduce logging for requests 
    - [x] Global config for reusable options.
#### Multiple Hosts: 
    - [ ] Support for different API hosts
    - [ ] Dynamically set the base URL.
#### Type-Safe Responses: 
    - [ ] Return typed responses
#### Batch Request Support: 
    - [ ] Execute multiple API calls concurrently or sequentially.