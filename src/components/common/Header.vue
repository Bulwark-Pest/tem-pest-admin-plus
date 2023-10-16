<script setup>
import { useSidebarStore } from "@/stores/sidebarStore";

const sidebarStore = useSidebarStore()
</script>

<template>
  <header>
    <nav>
      <div class="logo">
        <router-link to="/">
          <img src="@/assets/images/admin-logo.png" alt="Admin Logo">
        </router-link>
      </div>
    </nav>
  </header>
</template>

<style scoped>
header {
  background-color: var(--secondary-color);
  height: 100px;
}

nav {
  display: flex;
  align-items: center;
  padding: 10px;
}

.logo {
  display: flex;
  align-items: center;
}

img {
padding: 10px;
}
</style>
