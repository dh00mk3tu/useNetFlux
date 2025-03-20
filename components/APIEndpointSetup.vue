<template>
    <div class="method-container">
        <p class="text-2xl bold my-2">Endpoint Setup</p>
        <p>Enter a custom endpoint with "https://" included.</p>
        <p>Current default endpoint is 'https://dummyjson.com/products'</p>
        <div class="method-menu">
            <input type="text" v-model="playgroundStoreOpt.endpoint">
                <button @click="playgroundStoreOpt.handleTestButton()" class="m-2">
                    Test Store
                </button>
            </input>
        </div>
    </div>
</template>

<script setup lang="ts">
// const playgroundStore = usePlaygroundStore();
const playgroundStoreOpt = usePlaygroundStoreOpt();
</script>

<style scoped></style>