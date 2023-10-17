<script setup>
import Header from "@/components/common/Header.vue";
import Sidebar from "@/components/common/Sidebar.vue";
</script>

<template>
  <div class="content">
    <Header />
    <div class="sidebar">
      <Sidebar />
      <router-view id="currentPage"/>
    </div>
  </div>
</template>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
}

.sidebar {
  display: inherit;
}
</style>
