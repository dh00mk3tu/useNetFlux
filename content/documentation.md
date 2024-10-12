# Documentation

Here's the updated documentation with the name changed to `useNetStack`:

\---

\# NetStack Documentation

This `useNetStack` composable provides an abstraction for making API requests with additional features such as retries, caching, timeouts, cancellation, and logging. It also includes a global configuration that can be customized.

\## Table of Contents

\- \[Installation]\(#installation)

\- \[Basic Usage]\(#basic-usage)

\- \[API Request Structure]\(#api-request-structure)

\- \[Options for `executeCall`]\(#options-for-executecall)

\- \[Global Configuration]\(#global-configuration)

\- \[Features]\(#features)

\- \[Retries]\(#retries)

\- \[Timeouts]\(#timeouts)

\- \[Caching]\(#caching)

\- \[Request Cancellation]\(#request-cancellation)

\- \[Logging]\(#logging)

\- \[Methods]\(#methods)

\- \[\`executeCall\`]\(#executecall)

\- \[\`updateGlobalConfig\`]\(#updateglobalconfig)

\- \[Logging Behavior]\(#logging-behavior)

\- \[Example Usage]\(#example-usage)

\---

\## Installation

To use `useNetStack`, first import the composable into your Vue 3/Nuxt 3 project.

\`\`\`ts

import { useNetStack } from './netStack';

\`\`\`

\---

\## Basic Usage

The `useNetStack` composable allows you to make API calls with customizable options such as retries, timeouts, cache handling, and more.

\`\`\`ts

const { executeCall, updateGlobalConfig } = useNetStack();

// Example of making a GET request

executeCall({

apiRequest: {

method: 'GET',

endpoint: '<https://api.example.com/data>',

},

});

\`\`\`

\---

\## API Request Structure

The `apiRequest` object defines the structure of the API request.

\### Structure

\`\`\`ts

interface ApiRequest {

method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'; // HTTP method

endpoint: string;                                     // API endpoint

headers?: Record\<string, string>;                     // Optional headers

queryParams?: Record\<string, string | number>;        // Optional query parameters

body?: any;                                           // Optional body for POST, PUT, etc.

}

\`\`\`

\### Example

\`\`\`ts

const apiRequest = {

method: 'POST',

endpoint: '<https://api.example.com/create>',

headers: {

Authorization: 'Bearer token',

},

body: {

name: 'New Item',

description: 'This is a new item',

},

};

\`\`\`

\---

\## Options for `executeCall`

The `executeCall` function accepts the following options:

\`\`\`ts

interface ExecuteCallParams {

apiRequest: ApiRequest;             // The API request object

async?: boolean;                    // Run asynchronously without waiting for the ongoing request

override?: boolean;                 // Override any ongoing request for the same endpoint

retries?: number;                   // Number of retry attempts on failure (default: 3)

retryDelay?: number;                // Delay between retries in milliseconds (default: 1000ms)

cancellationToken?: AbortController; // Custom cancellation token

timeout?: number;                   // Request timeout in milliseconds (default: 5000ms)

cacheDuration?: number;             // Cache duration in milliseconds (default: 60000ms)

skipCache?: boolean;                // Skip cache and force a fresh request (default: false)

}

\`\`\`

\### Example

\`\`\`ts

executeCall({

apiRequest: {

method: 'GET',

endpoint: '<https://api.example.com/data>',

},

retries: 5,

timeout: 10000,

cacheDuration: 120000,  // Cache for 2 minutes

});

\`\`\`

\---

\## Global Configuration

`useNetStack` has a global configuration that can be updated using `updateGlobalConfig`. This allows setting default behaviors for all API calls.

\### Global Config Fields

\`\`\`ts

const defaultConfig = ref({

retries: 3,            // Default number of retries (3 attempts)

retryDelay: 1000,       // Default retry delay (1 second)

timeout: 5000,          // Default timeout (5 seconds)

cacheDuration: 60000,   // Default cache duration (1 minute)

async: false,           // Default async behavior (wait for ongoing request)

override: false,        // Default override behavior (do not override ongoing request)

skipCache: false,       // Default skip cache (false)

logging: true,          // Enable logging globally (true)

});

\`\`\`

\### Example: Updating Global Config

\`\`\`ts

updateGlobalConfig({

retries: 2,

timeout: 10000,  // 10 seconds timeout

logging: true,   // Enable logging

});

\`\`\`

\---

\## Features

\### Retries

`useNetStack` supports automatic retries when a network request fails. The number of retries and delay between retries can be configured.

\- **Global default**: 3 retries with a 1-second delay.

\- **Custom per request**: You can override the global retries for individual requests.

\### Timeouts

You can set a timeout for requests. If the request takes longer than the specified time, it will be aborted.

\- **Global default**: 5 seconds.

\- **Custom per request**: You can override the global timeout for individual requests.

\### Caching

Responses can be cached to prevent redundant network requests within a specific time frame.

\- **Global default**: Cached for 1 minute.

\- **Custom per request**: Set `cacheDuration` or skip cache by setting `skipCache: true`.

\### Request Cancellation

Abort controllers can be used to cancel ongoing requests. You can pass a custom `AbortController` or let `useNetStack` handle cancellation with timeouts.

\### Logging

Logging helps in monitoring the network stack’s behavior, such as request retries, errors, caching, and other events.

\- **Global Config**: Enable or disable logging globally.

\- **Log Levels**: `info`, `warn`, `error`.

\---

\## Methods

\### `executeCall`

Performs the API call with retries, caching, timeouts, and other options.

\`\`\`ts

async function executeCall({

apiRequest,

async,

override,

retries,

retryDelay,

cancellationToken,

timeout,

cacheDuration,

skipCache,

}: ExecuteCallParams): Promise\<any>

\`\`\`

\### `updateGlobalConfig`

Updates the global configuration of the network stack.

\`\`\`ts

function updateGlobalConfig(newConfig: Partial\<typeof defaultConfig.value>): void

\`\`\`

\---

\## Logging Behavior

Logging helps trace the flow of requests and catch potential issues during retries, caching, or timeouts. The logging system provides three levels:

\- **info**: General information about requests, retries, and caching.

\- **warn**: Warnings such as retries or request aborts.

\- **error**: Errors encountered during network requests.

\### Example Log Output

\`\`\`log

\[2024-10-12T10:00:00.000Z] INFO: Starting API call { url: '<https://api.example.com/data>', method: 'GET' }

\[2024-10-12T10:00:01.000Z] WARN: Retrying... Attempt 2 { endpoint: '<https://api.example.com/data>' }

\[2024-10-12T10:00:03.000Z] INFO: Response cached for: <https://api.example.com/data> { cacheDuration: 60000 }

\[2024-10-12T10:00:05.000Z] ERROR: API call failed for: <https://api.example.com/data> { error: 'Network error' }

\`\`\`

\---

\## Example Usage

\### Simple GET Request

\`\`\`ts

const { executeCall } = useNetStack();

executeCall({

apiRequest: {

method: 'GET',

endpoint: '<https://api.example.com/data>',

},

});

\`\`\`

\### POST Request with Retries and Timeout

\`\`\`ts

executeCall({

apiRequest: {

method: 'POST',

endpoint: '<https://api.example.com/create>',

body: { name: 'New Item' },

},

retries: 5,       // Retry up to 5 times

retryDelay: 2000, // 2-second delay between retries

timeout: 10000,   // 10-second timeout

});

\`\`\`

\### Request with Custom Cancellation Token

\`\`\`ts

const controller = new AbortController();

executeCall({

apiRequest: {

method: 'GET',

endpoint: '<https://api.example.com/data>',

},

cancellationToken: controller,  // Use a custom token to cancel the request

});

// Cancel the request after 2 seconds

setTimeout(() => controller.abort(), 2000);

\`\`\`

\### Updating Global Configuration

\`\`\`ts

const { updateGlobalConfig } = useNetStack();

updateGlobalConfig({

retries: 2,  // Update global retries to 2

logging: true,  // Enable logging globally

});

\`\`\`

\---
