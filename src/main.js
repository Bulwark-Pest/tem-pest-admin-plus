// test tools
// import "./assets/js/devTools.js";

import { createApp } from "vue";
import { createPinia } from "pinia";
// import { GoogleMap } from 'vue3-google-map';
import App from "./App.vue";
import PrimeVue from "primevue/config";
import Toast from "primevue/toast";
import { useResizeStore } from "@/stores/resizeStore";
import GoogleSignInPlugin from "vue3-google-signin";

import 'video.js/dist/video-js.css';
// Template components
import BaseBackground from "@/components/BaseBackground.vue";
import InputText from 'primevue/inputtext';
// Template directives
import clickRipple from "@/directives/clickRipple";
import Tooltip from 'primevue/tooltip';
import sliderNetValue from '@/directives/sliderNetValue';
import mitt from 'mitt';

// Bootstrap framework
import * as bootstrap from "bootstrap";
window.bootstrap = bootstrap;

//main scss
import "@/assets/scss/tempestSCSS/main.scss";

// Craft new application
const pinia = createPinia();
export const emitter = mitt();
export const app = createApp(App);

// Use Pinia and Vue Router
app.use(pinia);
app.config.globalProperties.$googleToken = '';

// Register global components
app.component("BaseBackground", BaseBackground);
app.component("InputText", InputText);
// eslint-disable-next-line vue/multi-word-component-names
app.component("Toast", Toast)
// Register global directives
app.directive("click-ripple", clickRipple);
app.directive('slider-net-value', sliderNetValue);
function round(num, decimalPlaces = 0) {
    num = Math.round(num + "e" + decimalPlaces);
    return Number(num + "e" + -decimalPlaces);
}

app.use(GoogleSignInPlugin, {
    clientId: '909185908730-nbfaj37hkqu5ed3ttfo0bcr2iea7cbiq.apps.googleusercontent.com',
});

app.config.globalProperties.$filters = {
    currencyUSD(value, decimalPlaces = 0) {
        return '$' + round(value, decimalPlaces)
    }
}
// optional, install theme only when SSR to extract critical css
app.use(PrimeVue);
app.directive('tooltip', Tooltip);
app.provide('emitter', emitter);
// fix issue with pinia
import router from "./router";
app.use(router);


const userSalesmanId = parseInt(localStorage.getItem('userSalesmanId'));
// Define localstorage
if (userSalesmanId === 0 || userSalesmanId == null) {
    // Global variables
    localStorage.setItem('userName', '');
    localStorage.setItem('userCode', '0');
    localStorage.setItem('userSalesmanId', '0');
    localStorage.setItem('userActive', '0');
    localStorage.setItem('userDepartment', '0');
    localStorage.setItem('userExtension', '0');
    localStorage.setItem('userHrEmpId', '0');
    localStorage.setItem('mainUserId', '0');
    localStorage.setItem('userRole', 'ROLE_ANONYMOUS');
    localStorage.setItem('userMainRole', 'ROLE_ANONYMOUS');
    sessionStorage.setItem('achPaymentList', '');
    localStorage.setItem('userPhoneNumber', '');
    // Helpers to Login
    localStorage.setItem("allowLogin", 'yes');
    localStorage.setItem("googleToken", '');
    // Store phone numbers
    sessionStorage.setItem('phoneNumberList', '');
    // Store credit cards
    sessionStorage.setItem('creditCardList', '');
    // Store service plan
    sessionStorage.setItem('servicePlanList', '');
    // Store locations
    sessionStorage.setItem('cid', '0');
    sessionStorage.setItem('customerDetailsLat', '0');
    sessionStorage.setItem('customerDetailsLng', '0');
    sessionStorage.setItem('customerDetailsGridName', '0');
}
app.config.globalProperties.emitter = emitter;

// and finally mount it!
app.mount("#app");

// resizeStore to watch window resize
const resizeStore = useResizeStore();
resizeStore.setEvent();
resizeStore.resizeEvent();
