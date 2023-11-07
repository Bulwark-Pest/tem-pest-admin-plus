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
    <button @click="sidebarStore.lockSidebar">
      <i v-if="sidebarStore.isSidebarLocked" class="fa-solid fa-lock"></i>
      <i v-else-if="!sidebarStore.isSidebarLocked" class="fa-solid fa-lock-open"></i>
    </button>
    <router-link to="/Test" class="link-button">
      <span>
        <i class="fa-solid fa-vial"></i>
      </span>
      <span>
        Test
      </span>
    </router-link>
  </aside>
</template>

<style scoped>
aside {
  display: inherit;
  flex-direction: column;
  background-color: var(--primary-color);
  width: 250px;
  height: 100vh;
  border-right: 5px solid var(--tertiary-color);

  transition: 0.3s;
}

aside.expanded {
  width: 60px;
}

.link-button {
  padding: 10px;
}

.link-button:hover {
  background-color: var(--background-color);
}

button {
  display: flex;
  width: 50px;
  background-color: inherit;
  border: var(--tertiary-color);
  padding: 5px;
  margin-left: 150px;
}

button:hover {
  color: var(--tertiary-color);
}
</style>
