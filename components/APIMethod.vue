<template>
    <div class="method-container">
        <p class="text-2xl bold my-2">Method Type</p>
        <div class="method-menu">
            <ul v-if="playgroundStoreOpt.httpMethods.length > 0">
                <li v-for="(method, index) in playgroundStoreOpt.httpMethods" :key="index"
                    :class="{ 'active-method': playgroundStoreOpt.httpMethods[index] === playgroundStoreOpt.currentHttpsMethod }" @click="playgroundStoreOpt.handleMethodTabClick(index)">
                    {{ method }}
                </li>
            </ul>
        </div>
        <p class="my-4">
            Testing <code class="box">{{ playgroundStoreOpt.currentHttpsMethod }}</code> method
        </p>
    </div>
</template>

<script setup lang="ts">
const playgroundStoreOpt = usePlaygroundStoreOpt();
</script>

<style scoped>

</style>