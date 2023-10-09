import './assets/main.css'
// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap.bundle.min'

import { createApp } from 'vue'
import { createPinia } from "pinia";
import App from './App.vue'
import router from './router';

// createApp(App).mount('#app')
const app = createApp(App);

app.use(router);
app.use(createPinia());
app.mount('#app');