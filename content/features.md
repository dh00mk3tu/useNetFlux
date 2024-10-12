# Features

# useNetStack - A Powerful Composable for API Requests

`useNetStack` is a versatile Vue 3/Nuxt 3 composable that abstracts and enhances API requests with built-in features like retries, caching, timeouts, request cancellation, and logging. It is designed to handle common challenges in API requests while providing a flexible and configurable structure.

## Key Features

### 1. **Retries**

Automatically retry failed requests based on configurable settings.

- **Global Default**: 3 retries

- **Customizable**: Set retries and retry delay per request

- **Example**:

```ts
executeCall({
  apiRequest: {
    method: "GET",

    endpoint: "https://api.example.com/data",
  },

  retries: 5, // Retry up to 5 times

  retryDelay: 2000, // 2-second delay between retries
});
```

### 2. **Timeouts**

Set time limits on API requests to avoid indefinite waiting.

- **Global Default**: 5 seconds
- **Customizable**: Timeout can be set per request
- **Example**:

```ts
executeCall({
  apiRequest: {
    method: "POST",

    endpoint: "https://api.example.com/create",

    timeout: 10000, // 10-second timeout
  },
});
```

### 3. **Caching**

Cache responses for a specified duration to minimize redundant network calls.

- **Global Default**: Cached for 1 minute
- **Customizable**: Set `cacheDuration` per request
- **Skip Cache**: Force bypassing cache by setting `skipCache: true`
- **Example**:

```ts
executeCall({
  apiRequest: {
    method: "GET",

    endpoint: "https://api.example.com/data",
  },

  cacheDuration: 120000, // Cache for 2 minutes

  skipCache: false, // Enable cache by default
});
```

### 4. **Request Cancellation**

Abort ongoing requests using an `AbortController`.

- **Auto-Generated**: Timeout automatically triggers request cancellation
- **Custom**: Pass your own `AbortController` to manually cancel requests
- **Example**:

```ts
const controller = new AbortController();

executeCall({
  apiRequest: {
    method: "GET",

    endpoint: "https://api.example.com/data",
  },

  cancellationToken: controller,
});

// Cancel the request after 2 seconds

setTimeout(() => controller.abort(), 2000);
```

### 5. **Global Configuration**

Define global defaults for retries, timeouts, caching, and more.

- **Flexible**: Update default settings for all requests
- **Example**:

```ts
updateGlobalConfig({
  retries: 5, // Set global retries to 5

  timeout: 15000, // Set global timeout to 15 seconds

  logging: true, // Enable logging globally
});
```

### 6. **Logging**

Get real-time logging information about request behavior.

- **Global Setting**: Enable or disable logging in the global configuration
- **Log Levels**: `info`, `warn`, `error`
- **Example** log output:

```log

[INFO]: Starting API call { url: 'https://api.example.com/data', method: 'GET' }

[WARN]: Retrying... Attempt 2 { endpoint: 'https://api.example.com/data' }

[ERROR]: API call failed { endpoint: 'https://api.example.com/data', error: 'Timeout' }
```

## Methods

### `executeCall`

The core method to make API requests with enhanced features like retries, caching, timeouts, and logging.

```ts
async function executeCall({
  apiRequest,

  retries = 3,

  retryDelay = 1000,

  timeout = 5000,

  cacheDuration = 60000,

  skipCache = false,

  cancellationToken,

  async = false,

  override = false,
}: ExecuteCallParams): Promise<any>;
```

### `updateGlobalConfig`

Modify global configurations for all requests.

```ts
function updateGlobalConfig(
  newConfig: Partial<typeof defaultConfig.value>
): void;
```

### Example: Updating Global Config

```ts
updateGlobalConfig({
  retries: 4, // Update retries globally to 4

  cacheDuration: 300000, // Cache for 5 minutes
});
```

## API Request Structure

`apiRequest` object defines the structure of the API call, which includes the HTTP method, endpoint, headers, and body.

### Structure:

```ts
interface ApiRequest {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"; // HTTP method

  endpoint: string; // API endpoint

  headers?: Record<string, string>; // Optional headers

  queryParams?: Record<string, string | number>; // Optional query parameters

  body?: any; // Optional body for POST, PUT, etc.
}
```

### Example:

```ts
const apiRequest = {
  method: "POST",

  endpoint: "https://api.example.com/create",

  headers: {
    Authorization: "Bearer token",
  },

  body: {
    name: "New Item",

    description: "This is a new item",
  },
};
```

## Example Usage

### Simple GET Request

```ts
executeCall({
  apiRequest: {
    method: "GET",

    endpoint: "https://api.example.com/data",
  },
});
```

### POST Request with Retries and Timeout

```ts
executeCall({
  apiRequest: {
    method: "POST",

    endpoint: "https://api.example.com/create",

    body: { name: "New Item" },
  },

  retries: 5, // Retry up to 5 times

  retryDelay: 2000, // 2-second delay between retries

  timeout: 10000, // 10-second timeout
});
```

### Request with Custom Cancellation Token

```ts
const controller = new AbortController();

executeCall({
  apiRequest: {
    method: "GET",

    endpoint: "https://api.example.com/data",
  },

  cancellationToken: controller, // Use a custom token to cancel the request
});

// Cancel the request after 2 seconds

setTimeout(() => controller.abort(), 2000);
```

### Updating Global Configuration

```ts
updateGlobalConfig({
  retries: 2, // Update global retries to 2

  logging: true, // Enable logging globally
});
```

## Conclusion

The `useNetStack` composable enhances the process of making API requests by providing support for retries, timeouts, caching, cancellation, and logging. It is flexible, with both per-request and global configurations available, making it a powerful tool for handling network requests in your Vue 3/Nuxt 3 applications.

```text

This markdown file contains a detailed description of the package and covers all features introduced in `useNetStack`.

```
