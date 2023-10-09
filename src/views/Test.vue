<script setup>
import Test1 from "@/components/test/Test1.vue";
import Test2 from "@/components/test/Test2.vue";
import { useTesterStore } from "@/stores/tester";

const testerText = useTesterStore()
</script>

<template>
  <div class="content">
    <div>
      {{ testerText.tester }}
    </div>
    <div id="test1">
      <Test1 />
    </div>
    <div id="test2">
      <Test2 />
    </div>
  </div>
</template>

<style scoped>
.content {
  background: aqua;
}
</style>