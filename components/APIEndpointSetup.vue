<template>
    <div class="method-container">
        <p class="text-2xl bold my-2">Endpoint Setup</p>
        <p>Enter a custom endpoint with "https://" included.</p>
        <p>Current default endpoint is 'https://dummyjson.com/products'</p>
        <div class="method-menu">
            <input type="text" v-model="playgroundStore.endpoint">
            <button @click="playgroundStore.handleTestButton()" class="m-2">
                Test
            </button>
            </input>
        </div>
    </div>
</template>

<script setup lang="ts">
const playgroundStore = usePlaygroundStore();
</script>

<style scoped>

</style>