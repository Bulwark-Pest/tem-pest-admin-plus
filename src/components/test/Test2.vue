<script setup>
import { useTesterStore } from "@/stores/tester";

const testerText = useTesterStore()
</script>

<template>
  <button @click="testerText.decreaseCount">-</button>
</template>

<style scoped>

</style>