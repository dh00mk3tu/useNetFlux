<template>
    <div class="method-container">
        <p class="text-2xl bold my-2">Response</p>
        <div class="w-100 flex flex-row justify-end">
            <button @click="copyToClipboard">{{ buttonCta }}</button>
        </div>
        <pre>
            {{ playgroundStoreOpt.response }}
        </pre>
    </div>
</template>

<script setup lang="ts">
const playgroundStoreOpt = usePlaygroundStoreOpt();

// Button CTA ref state
const buttonCta = ref<string>('Copy');

// Copy function
const copyToClipboard = async () => {
    try {
        if (playgroundStoreOpt.response.length < 0) {
            buttonCta.value = 'Response Empty!'
            throw "Empty Response"
        }
        await navigator.clipboard.writeText(JSON.stringify(playgroundStoreOpt.response));
        buttonCta.value = 'Copied!'

        // This will reset the button CTA back to copy after t seconds (2000ms)
        setTimeout(() => {
            buttonCta.value = 'Copy'
        }, 2000);
    } catch (error) {
        /**
         * Probably need a better way to notify the user that something has failed. Can't expect them to check console lol
         * Maybe I'll make a consolse for netstack only. 
         */
        console.error('Failed to copy text:', error);
    }
};
</script>

<style scoped></style>