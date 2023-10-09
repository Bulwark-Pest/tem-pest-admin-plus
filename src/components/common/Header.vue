<script setup>
</script>

<template>
  <div class="header">
    <div>
      <router-link to="Home" class="logo">
        <img src="@/assets/images/admin-logo.png" alt="Admin Logo">
      </router-link>
    </div>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: left;
  background-color: #293a50;
  padding: 5px;
}

.logo {
  height: 30px;
  border-radius: 2px;
  padding-left: 10px;
  padding-right: 10px;
  margin-top: 15px;
  background-color: #293a50;
  color: #d5d5d5;
  font-weight: bold;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;

}

.vertical-line {
  height: 100%;
  width: 1px; /* Or whatever width you want */
  background-color: rgba(0, 255, 0, 0.09); /* Or any other color */
}
</style>
