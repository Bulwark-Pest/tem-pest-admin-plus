<script setup>
</script>

<template>
  <div class="header">
    <div class="buttonContainer">
      <div>
        <router-link to="Home" class="router-link-button">Hello World</router-link>
      </div>
      <div>
        <router-link to="Test" class="router-link-button">Testing</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: right;
}

.buttonContainer {
  display: flex;
  justify-content: right;
  background-color: rgb(1, 68, 34);
  padding: 5px;
  border-radius: 10px;
  margin: 20px;
}

.router-link-button {
  height: 30px;
  border-radius: 10px;
  padding-left: 10px;
  padding-right: 10px;
  margin-left: 5px;
  margin-right: 5px;
  background-color: rgb(1, 68, 34);
  color: #d5d5d5;
  font-weight: bold;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;

}
.router-link-button:hover {
  cursor: pointer;
  color: white;
  background-color: rgb(0, 104, 52);
}

.vertical-line {
  height: 100%;
  width: 1px; /* Or whatever width you want */
  background-color: rgba(0, 255, 0, 0.09); /* Or any other color */
}

</style>
