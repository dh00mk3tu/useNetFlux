<template>
    <div class="method-container">
        <p class="text-2xl bold my-2">Method Type</p>
        <div class="method-menu">
            <ul v-if="playgroundStore.httpMethods.length > 0">
                <li v-for="(method, index) in playgroundStore.httpMethods" :key="index"
                    :class="{ 'active-method': playgroundStore.httpMethods[index] === playgroundStore.currentHttpsMethod }" @click="playgroundStore.handleMethodTabClick(index)">
                    {{ method }}
                </li>
            </ul>
        </div>
        <p class="my-4">
            Testing <code class="box">{{ playgroundStore.currentHttpsMethod }}</code> method
        </p>
    </div>
</template>

<script setup lang="ts">
const playgroundStore = usePlaygroundStore();
</script>

<style scoped>

</style>