<script setup>
import { useTemplateStore } from "@/stores/template";

import Button from "primevue/button";

const store = useTemplateStore();
</script>

<template>
  <button
      type="button"
      class="btn btn-sm btn-alt-secondary me-2 d-none d-lg-inline-block rounded-0"
      @click="store.sidebarMini({ mode: 'toggle' })"
  >
    <slot name="sidebar-mini-toggle">
      <i v-if="store.settings.sidebarMini" class="fa-solid fa-lock text-tertiary"></i>
      <i v-else-if="!store.settings.sidebarMini" class="fa-solid fa-unlock text-tertiary"></i>
    </slot>
  </button>
</template>

<style scoped lang="scss">

</style>