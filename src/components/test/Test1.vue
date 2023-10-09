<script setup>
import { useTesterStore } from "@/stores/tester";

const testerText = useTesterStore()
</script>

<template>
  <button @click="testerText.increaseCount">+</button>
</template>

<style scoped>

</style>