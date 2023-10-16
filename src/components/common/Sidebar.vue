<script setup>
import { useSidebarStore } from "@/stores/sidebarStore";

const sidebarStore = useSidebarStore()
</script>

<template>
  <div class="d-flex">
    <div :class="['sidebar position-absolute', sidebarStore.isSidebarOpen ? 'expand' : 'collapse']"
         @mouseover="!sidebarStore.isSidebarLocked && sidebarStore.setSidebarState(true)"
         @mouseout="!sidebarStore.isSidebarLocked && sidebarStore.setSidebarState(false)">
      <div>
        <router-link to="Test">Test</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  background-color: var(--background-color);
  height: 100%;

  transition: 0.3s ease;
}

.expand {
  width: 250px;
}

.collapse {
  width: 50px;
}
</style>
