<template>
    <div class="header-container">
        <h1 class="mx-auto">useNetStack - Playground</h1>
    </div>
    <div class="method-container">
        <h4>Step 1: Select Method Type</h4>
        <div class="method-menu">
            <ul v-if="httpMethods.length > 0">
                <li v-for="(method, index) in httpMethods" :key="index"
                    :class="{ 'active-method': index === currentActiveMethod }" @click="handleMethodTabClick(index)">
                    {{ method }}
                </li>
            </ul>
        </div>
        <pre>
        Testing <code>{{ httpMethods[currentActiveMethod] }}</code> method
        </pre>
    </div>
    <div class="method-container">
        <h4>Step 2: Custom Endpoint</h4>
        <p>Enter a custom endpoint with "https://" included.</p>
        <p>Current default endpoint is 'https://dummyjson.com/products'</p>
        <div class="method-menu">
            <input type="text" v-model="endpointInputModel">
            <button @click="handlePlayClick">
                Test
            </button>
            </input>
        </div>

    </div>
    <div class="method-container">
        <h4>Step 3: Response</h4>
        <h5>Response: </h5>
        <pre>
            {{ response }}
        </pre>
    </div>
</template>

<script setup lang="ts">

import { useNetStack, type HttpMethod } from '~/composable/useNetStackNuxt';
const { executeCall, updateGlobalConfig } = useNetStack();


const httpMethods = ['Get', 'Post', 'Delete', 'Put', 'Patch'];
const currentActiveMethod = ref(0);
const response = ref();


const endpointInputModel = ref('https://dummyjson.com/products/1');

const handleMethodTabClick = (methodIndex: number) => {
    if (methodIndex !== currentActiveMethod.value) {
        currentActiveMethod.value = methodIndex;
    }
}

const handlePlayClick = async () => {
    response.value = await executeCall({
        apiRequest: {
            endpoint: endpointInputModel.value,
            method: httpMethods[currentActiveMethod.value] as HttpMethod
        },
        skipCache: true
    });
}




</script>

<style scoped>
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
}

button {
    border: none;
    width: 10%;
    text-align: center;
    padding: 0.3em;
    margin: 1em;
    font-weight: 600;
    background-color: rgb(98, 171, 147);
    color: aliceblue;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    cursor: pointer;
}
</style>