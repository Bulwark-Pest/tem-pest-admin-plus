<script setup>
import { useTesterStore } from "@/stores/tester";

const testerText = useTesterStore()
</script>

<template>
  <div class="tester">
    {{ testerText.tester }}
  </div>
  <button @click="testerText.increaseCount">+</button>
</template>

<style scoped>
.tester {
  background-color: aqua;
}

</style>