<template>
    <div>
        Home
    </div>
</template>

<script setup lang="ts">
import { useRequestManager } from '~/composable/useNetStack';

const { executeCall } = useRequestManager();
</script>

<style scoped></style>