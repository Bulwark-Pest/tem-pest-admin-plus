<script setup>
import { useSidebarStore } from "@/stores/sidebarStore";

const sidebarStore = useSidebarStore()
</script>

<template>
  <div class="d-flex">
    <div :class="['bg-white', sidebarStore.isSidebarOpen ? 'w-25' : 'w-10']"
         @mouseover="!sidebarStore.isSidebarLocked && sidebarStore.setSidebarState(true)"
         @mouseout="!sidebarStore.isSidebarLocked && sidebarStore.setSidebarState(false)">
      <div>
        <router-link to="Test">Test</router-link>
      </div>
      <button v-if="sidebarStore.isSidebarOpen"
              class="btn btn-primary position-absolute"
              @click="sidebarStore.lockSidebar">
        {{ sidebarStore.isSidebarLocked ? 'Unlock' : 'Lock' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.content {
  display: flex;
  flex-direction: row;
}

.expand {
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
