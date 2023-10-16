<script setup>
import { useSidebarStore } from "@/stores/sidebarStore";

const sidebarStore = useSidebarStore()
</script>

<template>
  <div class="content">
    <div class="expand" :class="{ 'collapse': !sidebarStore.isSidebarOpen }"
         @mouseover="!sidebarStore.isSidebarLocked && sidebarStore.setSidebarState(true)"
         @mouseout="!sidebarStore.isSidebarLocked && sidebarStore.setSidebarState(false)">
      <div class="nav-routes">
        <router-link to="Test">Test</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.content {
  display: flex;
  flex-direction: row;
}

.expand {
  display: flex;
  flex-direction: row;
  width: 250px;
  height: 100%;
  color: var(--secondary-color);
  background-color: var(--primary-color);
  position: absolute;

  transition: 0.3s ease;
}

.collapse {
  width: 50px;
}

.nav-routes {
  display: flex;
  flex: 1;
  justify-content: flex-end;
  gap: 12px;
  list-style: none;
}
</style>
