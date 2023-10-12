<script setup>
import { useSidebarStore } from "@/stores/sidebarStore";

const sidebarStore = useSidebarStore()
</script>

<template>
  <div class="content">
    <button @click="sidebarStore.toggleSidebar()">Toggle Sidebar</button>
    <nav :class="['sidebar', { 'shrink': !sidebarStore.collapsed }]">
      <router-link to="Test" class="router-link-button">Test</router-link>
    </nav>
  </div>
</template>

<style scoped>
.sidebar {
  display: flex;
  height: 100%;
  width: 250px;
  color: var(--secondary-color);
  background-color: var(--primary-color);
  position: absolute;

  transition: 0.3s ease;
}

.shrink {
  width: 50px;
}
</style>