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
        <p class="text-xl font-bold">Live Preview of Default Values</p>

        <pre>
                    {{ defaultConfig }}
                </pre
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  useNetFlux,
  type HttpMethod,
  defaultConfig,
} from "~/composable/useNetFlux";
const playgroundStoreOpt = usePlaygroundStoreOpt();

const { updateGlobalConfig } = useNetFlux();

const newHeaderKeyModel = ref("");
const newHeaderValueModel = ref("");

const errorMessage = ref("");
const emptyHeaderKeyValue = ref(false);

const saveNewHeader = () => {
  if (newHeaderKeyModel.value && newHeaderValueModel.value) {
    playgroundStoreOpt.addNewHeader(
      newHeaderKeyModel.value,
      newHeaderValueModel.value
    );
    playgroundStoreOpt.newHeaderCreationActive = false;
    newHeaderKeyModel.value = "";
    newHeaderValueModel.value = "";
    emptyHeaderKeyValue.value = false;
    errorMessage.value = "";
  } else {
    emptyHeaderKeyValue.value = true;
    errorMessage.value = "Please fill in both key and value.";
  }
};

updateGlobalConfig(defaultConfig.value);
</script>

<style scoped>
.box {
  width: 100%;
}
</style>
