<template>
    <div class="method-container">
        <div class="menu flex flex-row justify-between items-center">
            <div class="main-menu">
                <div class="flex flex-row">
                    <div v-for="(menuItem, index) in playgroundStoreOpt.playgroundMainMenu">
                        <div :class="`box m-1 button ${menuItem.isVisible ? 'text-teal-400 bg-slate-700' : ''}`"
                            @click="playgroundStoreOpt.toggleOptionView(index)">
                            <span>
                                {{ menuItem.title }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <p class="my-4">
                    Testing <code class="box">{{ playgroundStoreOpt.currentHttpsMethod }}</code> method
                </p>
            </div>  
        </div>
    </div>
    <div v-for="menuItem in playgroundStoreOpt.playgroundMainMenu">
        <!-- I honestly have no idea why components are not being rendered in option store and if I push the code, 
         the pipeline will build it and I don't want to neither pause the pipline nor push broken code-->
         <!-- <p v-if="menuItem.isVisible">{{ menuItem.component.__name }}</p> -->
        <component :is="menuItem.component" v-if="menuItem.isVisible" markRaw   >
        </component>
    </div>

</template>

<script setup lang="ts">

import { useNetFlux, type HttpMethod, defaultConfig } from '~/composable/useNetFlux';
import { usePlaygroundStore } from '~/stores/playground.store';
const { executeCall, updateGlobalConfig } = useNetFlux();
const playgroundStoreOpt = usePlaygroundStoreOpt();


const httpMethods = playgroundStoreOpt.httpMethods;
const currentActiveMethod = ref(0);
const response = ref();



const endpointInputModel = playgroundStoreOpt.endpoint;

const handleMethodTabClick = (methodIndex: number) => {
    if (methodIndex !== currentActiveMethod.value) {
        currentActiveMethod.value = methodIndex;
    }
}

const handlePlayClick = async () => {
    response.value = await executeCall({
        apiRequest: {
            endpoint: endpointInputModel,
            method: httpMethods[currentActiveMethod.value] as HttpMethod
        },
        skipCache: false
    });
}




</script>

<style>
.box {
    border: 1px solid black;
    padding: 0.5em;
}

.method-container {
    border: 2px solid black;
    padding: 0.5em;
    margin: 0.5em 0 1em 0;
}


.method-menu ul {
    list-style: none;
    display: flex;
    flex-direction: row;
    /* border: 1px solid black; */
    justify-content: space-between;
    align-items: flex-start;
    padding: 0;
}

.method-menu ul li {
    border: 1px solid green;
    width: 100%;
    text-align: center;
    padding: 0.5em;
    font-weight: 600;
    background-color: rgb(98, 171, 147);
    color: aliceblue;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    cursor: pointer;
}

.method-menu ul li:hover {
    background-color: rgb(79, 139, 119);
    scale: 1.04;
}

.method-menu ul li.active-method {
    border: 1px solid rgb(86, 57, 106);
    background-color: rgb(142, 103, 213);
}

input {
    border: 0;
    padding: 0 1em 0 1em;
    height: 2em;
    width: 40%;
    font-size: 14px;
    color: blueviolet;
    background-color: rgb(181, 181, 181);
}

button {
    border: none;
    width: 10%;
    text-align: center;
    padding: 0.3em;
    font-weight: 600;
    background-color: rgb(98, 171, 147);
    color: aliceblue;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    cursor: pointer;
}

button:hover {
    background-color: rgb(79, 139, 119);
    scale: 1.04;
}

pre {
    white-space: pre-line;
}
</style>