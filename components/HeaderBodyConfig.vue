<template>
    <div class="method-container">
        <p class="text-2xl bold my-2">Configure Headers & Body</p>
        <div class="flex justify-around">
            <div class="box">
                <header class="flex items-center justify-between">
                    <p class="text-xl font-bold">Add/Remove Headers</p>
                </header>
                <div class="flex items-center justify-between">
                    <button>+</button>
                    <button>-</button>
                </div>
                <div v-for="(value, key, index) in playgroundStoreOpt.headers" :key="index" class="my-3">
                    <div class="flex justify-between">
                        <label>{{ key }}:</label>
                        <input type="text" class="w-10" v-model="playgroundStoreOpt.headers[key]" />
                    </div>
                </div>
            </div>
            <div class="box">
                <p class="text-xl font-bold">Live Preview of Default Values</p>

                <pre>
                    {{ defaultConfig }}
                </pre>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useNetFlux, type HttpMethod, defaultConfig } from '~/composable/useNetFlux';
const playgroundStoreOpt = usePlaygroundStoreOpt();

const { updateGlobalConfig } = useNetFlux();

updateGlobalConfig(defaultConfig.value);

</script>

<style scoped>
.box {
    width: 100%;
}

</style>