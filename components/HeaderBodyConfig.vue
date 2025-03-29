<template>
  <div class="method-container">
    <p class="text-2xl bold my-2">Configure Headers & Body</p>
    <div class="flex justify-around">
      <div class="box">
        <header class="flex items-center justify-between">
          <p class="text-xl font-bold">Add/Remove Headers</p>
          <button @click="playgroundStoreOpt.toggleNewHeaderCreation">
            {{ playgroundStoreOpt.newHeaderCreationActive ? "Cancel" : "+" }}
          </button>
        </header>

        <div
          v-if="!playgroundStoreOpt.newHeaderCreationActive"
          v-for="(value, key, index) in playgroundStoreOpt.headers"
          :key="index"
          class="my-3"
        >
          <div class="flex justify-between">
            <!-- <label>{{ key }}:</label> -->
            <label class="text-sm font-bold">{{ key }}:</label>
            <!-- <input type="text" class="" v-model="playgroundStoreOpt.headers[key]" /> -->
            <!-- ------- -->
            <div class="flex items-center justify-between">
              <input
                type="text"
                class="w-60 mr-1"
                v-model="playgroundStoreOpt.headers[key]"
              />
              <button @click="playgroundStoreOpt.removeHeader(key)">-</button>
            </div>
          </div>
        </div>
        <div v-if="playgroundStoreOpt.newHeaderCreationActive">
          <div class="flex justify-between mt-2">
            <input
              placeholder="Key"
              type="text"
              class="w-60 mr-1"
              v-model="newHeaderKeyModel"
            />
            <input
              placeholder="Value"
              type="text"
              class="w-60 mr-1"
              v-model="newHeaderValueModel"
            />
          </div>
        </div>
        <button
          v-if="playgroundStoreOpt.newHeaderCreationActive"
          class="mt-2"
          @click="saveNewHeader()"
        >
          Save
        </button>
        <div v-if="emptyHeaderKeyValue" class="text-red-500 text-sm mt-2">
          {{ errorMessage }}
        </div>
      </div>

      <div class="box">
        <p class="text-xl font-bold">Request Body</p>
        <p v-if="playgroundStoreOpt.currentHttpsMethod === 'GET'">
          (Disabled for GET method)
        </p>

        <p v-if="jsonError" class="text-red-500 text-sm mt-2">
          {{ jsonError }}
        </p>
        <div class="textarea-container">
          <!-- Line numbers for the textarea -->

          <div class="line-numbers">
            <span v-for="line in rawBody.split('\n').length" :key="line">{{
              line
            }}</span>
          </div>
          <!-- Textarea for req bod -->
          <textarea
            v-model="rawBody"
            @input="validateAndFormatJSON"
            class="textarea-with-lines"
            placeholder="Enter request body"
            ref="textareaRef"
            :style="{
              backgroundColor:
                jsonError || playgroundStoreOpt.currentHttpsMethod === 'GET'
                  ? '#f8d7da'
                  : '#fff',
            }"
            @scroll="syncScroll"
            :disabled="playgroundStoreOpt.currentHttpsMethod === 'GET'"
          ></textarea>
        </div>
      </div>
    </div>
    <div v-if="showPreview" class="pre-container my-2">
      <!-- Line numbers for the pre tag -->
      <div class="line-numbers">
        <span v-for="line in formattedBody.split('\n').length" :key="line">{{
          line
        }}</span>
      </div>
      <!-- Pre tag for formatted JSON -->
      <pre class="pre-with-lines">{{ formattedBody }}</pre>
    </div>
    <p class="text-sm mt-2">
      Note: The body is only used for POST, PUT, and PATCH methods.
    </p>
  </div>
</template>

<script setup lang="ts">
import {
  useNetFlux,
  type HttpMethod,
  defaultConfig,
} from "~/composable/useNetFlux";
import { ref, watch } from "vue";

const playgroundStoreOpt = usePlaygroundStoreOpt();

const { updateGlobalConfig } = useNetFlux();

const newHeaderKeyModel = ref("");
const newHeaderValueModel = ref("");

const errorMessage = ref("");
const emptyHeaderKeyValue = ref(false);

const rawBody = ref("");
const formattedBody = ref("");
const jsonError = ref("");
const textareaHeight = ref(0);
const textareaRef = ref<HTMLTextAreaElement | null>(null);

const saveNewHeader = () => {
  if (newHeaderKeyModel.value && newHeaderValueModel.value) {
    playgroundStoreOpt.addNewHeader(
      newHeaderKeyModel.value,
      newHeaderValueModel.value
    );

    resetStates();
  } else {
    emptyHeaderKeyValue.value = true;
    errorMessage.value = "Please fill in both key and value.";
  }
};

const showPreview = computed(() => {
  if (rawBody.value && !jsonError.value) {
    return true;
  }
  return false;
});

const resetStates = () => {
  playgroundStoreOpt.newHeaderCreationActive = false;
  newHeaderKeyModel.value = "";
  newHeaderValueModel.value = "";
  emptyHeaderKeyValue.value = false;
  errorMessage.value = "";
};

const validateAndFormatJSON = () => {
  try {
    const parsed = JSON.parse(rawBody.value);
    formattedBody.value = JSON.stringify(parsed, null, 2);
    playgroundStoreOpt.body = parsed;
    jsonError.value = "";
  } catch (e) {
    jsonError.value = "Invalid JSON format.";
    formattedBody.value = "";
  }
};

// Adjust the height of the textarea dynamically
const adjustTextareaHeight = () => {
  const textarea = textareaRef.value;
  if (textarea) {
    textarea.style.height = "auto"; // Reset height to auto to calculate the scroll height
    textarea.style.height = `${textarea.scrollHeight}px`; // Set height to match content
    textareaHeight.value = textarea.scrollHeight; // Update the height for line numbers
  }
};

// Sync the scroll position of the line numbers with the textarea
const syncScroll = (event: any) => {
  const textarea = event.target;
  const lineNumbers = textarea.previousElementSibling;
  if (lineNumbers) {
    lineNumbers.scrollTop = textarea.scrollTop;
  }
};

// Watch for changes in rawBody and adjust the height
watch(rawBody, adjustTextareaHeight);

// Adjust the height initially
watch(() => rawBody.value, adjustTextareaHeight);

updateGlobalConfig(defaultConfig.value);
</script>

<style scoped>
.box {
  width: 100%;
}

.textarea-container,
.pre-container {
  display: flex;
  align-items: flex-start;
  position: relative;
}

.line-numbers {
  padding: 0.5em;
  background-color: #f0f0f0;
  color: #888;
  text-align: right;
  user-select: none;
  border-right: 1px solid #ccc;
  font-family: monospace;
}

.line-numbers span {
  display: block;
  line-height: 1.5em;
}

.textarea-with-lines,
.pre-with-lines {
  flex: 1;
  padding: 0.5em;
  border: none;
  outline: none;
  font-family: monospace;
  line-height: 1.5em;
  resize: none;
}

.textarea-with-lines {
  background-color: #fff;
}

.pre-with-lines {
  background-color: #f9f9f9;
  overflow: auto;
  white-space: pre-wrap;
}
</style>
