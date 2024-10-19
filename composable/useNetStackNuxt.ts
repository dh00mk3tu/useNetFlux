import { ref } from "vue";

// Define a type for the HTTP methods
export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

// Define a type for the API request details
interface ApiRequest {
  method: HttpMethod;
  endpoint: string;
  headers?: Record<string, string>;
  queryParams?: Record<string, string | number>;
  body?: any;
}

// Define the type for the parameters passed to executeCall
interface ExecuteCallParams {
  apiRequest: ApiRequest;
  async?: boolean;
  override?: boolean;
  retries?: number; // Number of retry attempts
  retryDelay?: number; // Delay between retries in milliseconds
  cancellationToken?: AbortController; // Custom cancellation token
  timeout?: number; // Timeout duration in milliseconds
  cacheDuration?: number; // Cache duration in milliseconds
  skipCache?: boolean; // Flag to skip cache and force a new request
}

// Global configuration for the request manager
export const defaultConfig = ref({
  retries: 3, // Default number of retry attempts
  retryDelay: 1000, // Default delay between retries in milliseconds
  timeout: 5000, // Default timeout in milliseconds (5 seconds)
  cacheDuration: 60000, // Default cache duration in milliseconds (1 minute)
  async: false, // Default async behavior
  override: false, // Default override behavior
  skipCache: false, // Default cache skipping
  logging: true, // Enable or disable logging globally
});

export function useNetStack() {
  const requestQueue = ref(new Map()); // Store ongoing requests
  const cacheStore = ref(new Map()); // Store cached responses

  // Helper function for logging
  function log(
    level: "info" | "warn" | "error",
    message: string,
    ...details: any[]
  ) {
    if (defaultConfig.value.logging) {
      const timestamp = new Date().toISOString();
      console[level](
        `[${timestamp}] ${level.toUpperCase()}: ${message}`,
        ...details
      );
    }
  }

  // Helper function to handle request timeout
  function createTimeoutAbortController(timeout: number) {
    const controller = new AbortController(); // Create an AbortController
    const timeoutId = setTimeout(() => {
      controller.abort(); // Abort the request if the timeout occurs
      log("warn", `Request timed out after ${timeout}ms`);
    }, timeout);

    // Return the controller and a function to clear the timeout
    return { controller, clearTimeout: () => clearTimeout(timeoutId) };
  }

  // Helper function to generate cache key based on URL and query params
  function generateCacheKey(
    url: string,
    queryParams: Record<string, string | number>
  ) {
    const queryString = new URLSearchParams(queryParams as any).toString();
    return queryString ? `${url}?${queryString}` : url;
  }

  // Function to check if cached data is valid
  function isCacheValid(cacheTimestamp: number, cacheDuration: number) {
    const currentTime = Date.now();
    return currentTime - cacheTimestamp < cacheDuration;
  }

  // Helper function to attempt the network call with retry, timeout, and cache support
  async function attemptNetworkCall(
    {
      apiRequest,
      retries,
      retryDelay,
      cancellationToken,
      timeout,
      cacheDuration,
      skipCache,
    }: ExecuteCallParams,
    attempt: number
  ): Promise<any> {
    const {
      method,
      endpoint,
      headers = {},
      queryParams = {},
      body,
    } = apiRequest;

    // Generate a cache key based on the request
    const cacheKey = generateCacheKey(endpoint, queryParams);

    // If cache is not skipped and cache duration is valid, check for cached response
    if (!skipCache && cacheDuration && cacheDuration > 0) {
      const cachedResponse = cacheStore.value.get(cacheKey);
      if (
        cachedResponse &&
        isCacheValid(cachedResponse.timestamp, cacheDuration)
      ) {
        log("info", `Returning cached response for: ${cacheKey}`);
        return cachedResponse.data;
      }
    }

    // Use either the provided cancellation token or create a new AbortController
    let controller = cancellationToken || new AbortController();
    let timeoutCleanup: (() => void) | undefined;

    if (timeout) {
      // Create a timeout-bound controller if timeout is specified
      const timeoutController = createTimeoutAbortController(timeout);
      controller = timeoutController.controller;
      timeoutCleanup = timeoutController.clearTimeout;
    }

    const signal = controller.signal;

    // Define the network request function
    const networkCall = async () => {
      log("info", `Attempting network call`, { endpoint, method, attempt });

      try {
        const options: RequestInit = {
          method,
          headers: {
            "Content-Type": "application/json",
            ...headers,
          },
          signal,
        };

        // Add body for methods that require it
        if (["POST", "PUT", "PATCH"].includes(method) && body) {
          options.body = JSON.stringify(body);
        }

        const response = await fetch(endpoint, options);

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }

        const result = await response.json();

        log("info", `Network call successful`, {
          endpoint,
          method,
          attempt,
          result,
        });

        // Cache the response if cache duration is specified
        if (cacheDuration && cacheDuration > 0) {
          cacheStore.value.set(cacheKey, {
            data: result,
            timestamp: Date.now(), // Save the current timestamp
          });
          log("info", `Response cached for: ${cacheKey}`, { cacheDuration });
        }

        return result;
      } catch (error: any) {
        if (error.name === "AbortError") {
          log("warn", "Request aborted:", { endpoint });
        } else {
          log("error", "Request failed:", { error, endpoint });
          return error;
        }

        // If retries are allowed and there are still retries left, retry the request
        if (retries && attempt < retries) {
          log("warn", `Retrying... Attempt ${attempt + 1}`, {
            endpoint,
            method,
            retryDelay,
          });
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
          return attemptNetworkCall(
            {
              apiRequest,
              retries,
              retryDelay,
              cancellationToken,
              timeout,
              cacheDuration,
              skipCache,
            },
            attempt + 1
          );
        } else {
          // If no retries left, throw the error
          throw error;
        }
      } finally {
        if (timeoutCleanup) {
          timeoutCleanup(); // Clear the timeout after request completes or fails
        }
      }
    };

    // Execute the network call
    return networkCall();
  }

  // Helper function to execute the network call with async/override, retry, timeout, and cache logic
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
  }: ExecuteCallParams) {
    const {
      method,
      endpoint,
      headers = {},
      queryParams = {},
      body,
    } = apiRequest;

    // Merge user-provided options with global config
    const mergedOptions = {
      async: async !== undefined ? async : defaultConfig.value.async,
      override:
        override !== undefined ? override : defaultConfig.value.override,
      retries: retries !== undefined ? retries : defaultConfig.value.retries,
      retryDelay:
        retryDelay !== undefined ? retryDelay : defaultConfig.value.retryDelay,
      timeout: timeout !== undefined ? timeout : defaultConfig.value.timeout,
      cacheDuration:
        cacheDuration !== undefined
          ? cacheDuration
          : defaultConfig.value.cacheDuration,
      skipCache:
        skipCache !== undefined ? skipCache : defaultConfig.value.skipCache,
    };

    const queryString = new URLSearchParams(queryParams as any).toString();
    const url = queryString ? `${endpoint}?${queryString}` : endpoint;

    log("info", `Starting API call`, { url, method, mergedOptions });

    // Check if an API call is already ongoing for this endpoint
    if (requestQueue.value.has(url)) {
      if (mergedOptions.override) {
        // Abort previous call and remove it from the queue
        const ongoingRequest = requestQueue.value.get(url);
        ongoingRequest.controller.abort();
        requestQueue.value.delete(url);
        log("info", `Aborted ongoing request for: ${url}`);
      } else if (!mergedOptions.async) {
        // If not async and no override, wait for the current one to finish
        log("info", `Waiting for ongoing request to complete for: ${url}`);
        await requestQueue.value.get(url).promise;
      }
    }

    // Perform the network call with retries, cancellation token, timeout, and cache support
    const callPromise = attemptNetworkCall(
      {
        apiRequest,
        retries: mergedOptions.retries,
        retryDelay: mergedOptions.retryDelay,
        cancellationToken,
        timeout: mergedOptions.timeout,
        cacheDuration: mergedOptions.cacheDuration,
        skipCache: mergedOptions.skipCache,
      },
      0
    );

    // Add the request to the queue
    requestQueue.value.set(url, {
      controller: cancellationToken || new AbortController(),
      promise: callPromise,
    });

    try {
      const result = await callPromise;
      log("info", `API call completed for: ${url}`, { result });
      return result;
    } catch (error) {
      log("error", `API call failed for: ${url}`, { error });
      throw error;
    } finally {
      // Remove the request from the queue after it completes
      requestQueue.value.delete(url);
    }
  }

  // Function to update the global configuration
  function updateGlobalConfig(newConfig: Partial<typeof defaultConfig.value>) {
    defaultConfig.value = { ...defaultConfig.value, ...newConfig };
    log("info", `Global config updated`, { newConfig });
  }

  return { executeCall, updateGlobalConfig };
}
