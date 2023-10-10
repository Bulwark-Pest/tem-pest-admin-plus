<script setup>
import { useToggleSidebar } from "@/stores/sidebar";

const sidebarToggle = useToggleSidebar()
</script>

<template>
  <div class="sidebar">
    <router-link to="Test" class="router-link-button">Testing</router-link>
    <span class="collapse-icon" @click="sidebarToggle.collapse">
      <i class="fas fa-angle-double-left" />
    </span>
  </div>
</template>

<style scoped>
.sidebar {
  color: #293a50;
  background-color: white;
  margin-top: 73px;

  float: left;
  position: fixed;
  z-index: 1;
  top: 0;
  bottom: 0;
  padding: 0.5em;
  //width: {{ sidbarToggle.sidebarWidth }};

  transition: 0.3s ease;

  display: flex;
  flex-direction: column;
}

.collapse-icon {
  position: absolute;
  bottom: 0;
  padding: 0.75em;
  color: #293a50;
  transition: 0.2s linear;
}
</style>