<script setup>
</script>

<template>
  <header>
    <nav>
      <div class="logo">
        <img src="@/assets/images/admin-logo.png" alt="Admin Logo">
      </div>
      <ul class="nav-routes">
        <router-link to="/">Home</router-link>
        <router-link to="/Test">Test</router-link>
      </ul>
    </nav>
  </header>
</template>

<style scoped>
header {
  background-color: var(--secondary-color);
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

.nav-routes {
  display: flex;
  flex: 1;
  justify-content: flex-end;
  gap: 12px;
  list-style: none;
}

a {
  text-decoration: none;
  color: var(--primary-color);
}

a:hover {
  color: var(--tertiary-color);
}
</style>
