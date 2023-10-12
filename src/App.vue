<script setup>
import Header from "@/components/common/Header.vue";
import Sidebar from "@/components/common/Sidebar.vue";
</script>

<template>
  <Header />
  <Sidebar />
  <router-view id="currentPage"/>
</template>

<style scoped></style>
