# useNetStack

---

Designed, developed and delivered with <3 by Anirudh Rath | dh00mk3tu 


## Why did I make this?

Jumping onto any new technology, framework or library tto build apps etc is a challenge in itself. After a certain while, you hit the blocker that how do we make API calls in this environment; because naturally you have to consume data from the network at some point. Eventually you end up watching tutorials and reading documentation, but there is still no structure to it.

This composable helps to provide you with that structure.

I'm calling it a composable in general and not just in the terms of NUXT. It is a utility method for you that provides you a with very granular and precise control over your network calls.

Let's discuss what's there to offer and you'll know whether you need this or not by looking at this quick example.

### [Features](/features)

### [Documentation](/documentation)

### [useNetStack - Playground](/playground)

---

### Quick Example

`useNetStack` can make network calls for you, in a clean and intuitive manner. It can help you structure your API calls, provide you with logs when you need them and solid control of each individual call as well. Let's start by making a normal API call.

After importing `useNetStack()`, you'll find that it exports a method called `executeCall` . This method allows us to make our API calls and provides us with all the options that are required for granular control over our call.

![Importing Method](/importingmethod.png)

```ts [api_call.ts]
const { executeCall } = useNetStack();

const result = await executeCall({
  apiRequest: {
    method: 'GET',
    endpoint: '/api/products',
  },
});
```

Now, `executeCall` accepts an argument which is an object. Now this object accepts a number a typed arguments, as shown in the image below.

![Screenshot from 2024-10-12 18-45-22.png](/22.png)

Now, there is one `param` which is required, while rest are optional.

`apiRequest` is a required parameter which is an object, and this object also requires certain mandatory parameters. Let's use it and see what options are available to us.

![Screenshot from 2024-10-12 18-53-14.png](/14.png)

Notice, that the required keys have pretty self explanatory names, let's add these required parameters.

![Screenshot\_20241012\_192602.png](/Screenshot_20241012_192602.png)

We can select the type of our API method, and specify the API endpoint.

Now all you have to do is play around with the result that you get from the endpoint.

Head over to [Features](/features) to read more about the `useNetStack` or head to [Documentation](/documentation) if you're ready to get started.
