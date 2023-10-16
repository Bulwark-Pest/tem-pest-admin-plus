<script setup>
import { useSidebarStore } from "@/stores/sidebarStore";

const sidebarStore = useSidebarStore()
</script>

<template>
  <aside
      @mouseover="!sidebarStore.isSidebarLocked && sidebarStore.setSidebarState(true)"
      @mouseout="!sidebarStore.isSidebarLocked && sidebarStore.setSidebarState(false)"
      :class="{ expanded: !sidebarStore.isSidebarOpen }"
  >
    <router-link to="/Test">Test</router-link>
    <button v-show="sidebarStore.isSidebarOpen" @click="sidebarStore.lockSidebar">
      <i class="fa-solid fa-bars"></i>
    </button>
  </aside>
</template>

<style scoped>
aside {
  width: 250px;
  height: calc(100vh - 100px);
  position: absolute;
  background-color: var(--tertiary-color);

  transition: 0.3s;
}

aside.expanded {
  width: 50px;
}
</style>
