<template>
    <div class="flex flex-col h-screen">
        <!-- Top Navigation -->
        <div class="box">
            <div class="flex flex-row justify-between items-center">
                <div class="logo p-4">
                    <p class="text-4xl header-text-bold text-gray-800">useNetStack</p>
                    <p>A powerful network composable & light-weight API playground</p>
                </div>
                <div class="menu p-4">
                    <ul class="flex flex-row">
                        <div v-for="(menuOption, index) in menuItems">
                            <div :class="`box button p-4 m-1 ${menuOption.title === currentTab.title ? 'text-teal-400 bg-slate-700' : ''}`"
                                :key="index" @click="handleMenuClick(menuOption.title)">
                                <span>{{ menuOption.title }}</span>
                            </div>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
        <!-- Sliding Content -->
        <div class="relative flex-grow overflow-hidden">
            <transition name="slide" mode="out-in">
                <div :key="currentTab.title" class="box absolute inset-0 overflow-y-scroll">
                    <!-- Conditional rendering based on currentTab -->
                    <div v-if="currentTab.title === 'Playground'" class="p-4">
                        <p class="px-2">
                            <Playground></Playground>
                        </p>
                    </div>
                    <div v-else class="p-4">
                        <p class="header-text-bold text-2xl p-2">
                            Inception
                        </p>
                        <p class="px-2 py-2">
                            While working on one a project; I came accross a problem where we had tabs to change the UI;
                            and
                            whenever you'd click on a tab,
                            it would make a new network request to fetch and show new data of that respective tab. Now,
                            if you do it
                            slow enough, it would
                            switch the tab and show a preloader while it fetched the data from the API.

                            <br>
                            <br>
                            But the problem arose if you click tabs quickly, and switched between them fast-enough. This
                            lead to
                            each click triggering an API call;
                            and when the user finally stopped switching between the tabs - it lead to completion of each
                            request one
                            by one - which in turn lead to
                            the data in the UI getting updated in sequence as each API request was resolving a
                            successful response.

                            <br><br>
                            This was obviously bad user experience, but more than that - it was bad handling of APIs
                            itself.
                            I wanted an architecture which would allow me to abort/cancel the previous on going API
                            request and
                            instead make a new, updated API request.

                            <br><br>
                            I started exploring what solutions I have available and, sure I could implement a simple
                            solution to
                            this to handle my APIs properly I realized
                            that there is no API controller or package that would provide me with any control over my
                            requests.
                            Hence, <u>useNetStack</u> was born.

                            <br><br>
                            Read more about the <a href="/features">Features</a> or you can checkout the <a
                                href="/documentation">Documentation</a> instead.
                        </p>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script setup lang="ts">
import Playground from './playground.vue';
type MenuItem = {
    title: string,
    isSelected: boolean
}
const menuItems = <MenuItem[]>[
    {
        title: 'Home',
        isSelected: true
    },
    {
        title: 'Playground',
        isSelected: false
    }
];


const currentTab = ref<MenuItem>({ title: 'Home', isSelected: true });

const handleMenuClick = (optionItem: string) => {
    currentTab.value.title = optionItem;
    currentTab.value.isSelected = true;
    for (let index = 0; index < menuItems.length; index++) {
        if (menuItems[index].title != optionItem) {
            menuItems[index].isSelected = true;
        } else {
            menuItems[index].isSelected = false;
        }
    }
}
</script>

<style>
/* Base styles for transition */
.slide-enter-active,
.slide-leave-active {
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-enter {
    transform: translateX(100%);
    /* Start position when entering */
}

.slide-leave-to {
    transform: translateX(-100%);
    /* End position when leaving */
}

.absolute {
    position: absolute;
}

a {
    text-decoration: underline;
    color: rgb(150, 101, 150);
    font-weight: 600;
}

.button {
    position: relative;
    /* Needed for pseudo-element positioning */
    border: 2px solid slategray;
    overflow: hidden;
    /* Keeps the background animation inside the button */
    transition: color 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
    cursor: pointer;
    z-index: 1;
    /* Ensures the button text stays above the pseudo-elements */
}

.button::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    /* Start the background outside the button */
    width: 100%;
    height: 100%;
    background-color: slategray;
    z-index: 0;
    /* Keeps the background below the text */
    transition: left 0.5s cubic-bezier(0.075, 0.82, 0.165, 1);
}

.button:hover {
    color: #fff;
    /* Text color changes on hover */
}

.button:hover::before {
    left: 0;
    /* Slides the background into the button */
}

/* Ensure text remains visible */
.button span {
    position: relative;
    /* Text stays on top of the sliding background */
    z-index: 2;
    /* Higher than the pseudo-element */
}

/* Click animation */
.button::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background-color: rgb(52, 59, 66);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    /* Above the background, but below the text */
    transition: width 0.3s ease, height 0.3s ease, opacity 0.4s ease;
    opacity: 0;
}

.button:active::after {
    width: 200%;
    height: 200%;
    opacity: 1;
    transition: width 0.1s ease, height 0.3s ease, opacity 0.4s ease;
}
</style>