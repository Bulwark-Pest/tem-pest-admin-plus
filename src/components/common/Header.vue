<script setup>
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

a {
  text-decoration: none;
  color: var(--primary-color);
}

a:hover {
  color: var(--tertiary-color);
}
</style>
