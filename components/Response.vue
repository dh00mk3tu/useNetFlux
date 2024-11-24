<template>
    <div class="method-container">
        <p class="text-2xl bold my-2">Response</p>
        <div class="w-100 flex flex-row justify-end">
            <button @click="copyToClipboard">Copy to Clipboard</button>
            <p v-if="copied" class="text-green-500 mt-2">Copied to clipboard!</p>
        </div>
        <pre>
            {{ playgroundStore.response }}
        </pre>
    </div>
</template>

<script setup lang="ts">
const playgroundStore = usePlaygroundStore();

// State to track if the value was copied
const copied = ref(false);

// Copy functionality
const copyToClipboard = async () => {
    try {
        await navigator.clipboard.writeText(JSON.stringify(playgroundStore.response));
        copied.value = true;

        // Reset the copied state after a short delay
        setTimeout(() => {
            copied.value = false;
        }, 2000);
    } catch (error) {
        console.error('Failed to copy text:', error);
    }
};
</script>

<style scoped></style>