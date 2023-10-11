<script setup>
import { useToggleSidebar } from "@/stores/sidebar";

const sidebarToggle = useToggleSidebar()
</script>

<template>
  <div class="content">
    <nav>
      <router-link to="Test" class="router-link-button">Testing</router-link>
<!--      <span class="collapse-icon" @click="sidebarToggle.collapse">-->
<!--        <i class="fas fa-angle-double-left" />-->
<!--      </span>-->
    </nav>
  </div>
</template>

<style scoped>
.content {
  color: var(--secondary-color);
  background-color: var(--primary-color);
  margin-top: 78px;

  float: left;
  position: fixed;
  top: 0;
  bottom: 0;
  padding: 0.5em;

  transition: 0.3s ease;
}

.collapse-icon {
  position: absolute;
  bottom: 0;
  padding: 0.75em;
  color: var(--secondary-color);
  transition: 0.2s linear;
}
</style>