<template>
    <div class="method-container">
        <p class="text-2xl bold">Step 0: Configure Defaults</p>
        <div class="box flex justify-around">
            <div class="box">
                edit config options
            </div>
            <div class="box">
                live preview of default config
            </div>
        </div>
        <div class="method-menu">
            {{ defaultConfig }}
            <div v-if="defaultConfig">
                <div v-for="(defaultConfigOptions, index) in defaultConfig" :key="index">
                    {{ defaultConfigOptions }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useNetStack, type HttpMethod, defaultConfig } from '~/composable/useNetStackNuxt';
const { executeCall, updateGlobalConfig } = useNetStack();
</script>

<style scoped>

</style>