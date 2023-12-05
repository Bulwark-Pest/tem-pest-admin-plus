import { createRouter, createWebHashHistory } from "vue-router";

import NProgress from "nprogress/nprogress.js";
import Swal from "sweetalert2";

// Main layout variations
import LayoutSimple from "@/layouts/variations/Simple.vue";
import LayoutBackend from "@/layouts/variations/Backend.vue";
import { useChannelStore } from "../stores/channelStore";
import { ENV } from "@/stores/config";
import {emitter} from "@/main.js";
import emitterControls from "@/assets/js/emitterControls";
import { useTempestStore } from "@/stores/tempest";
import { validLocalStorageCredentials } from "@/services/auth.service";

const BackendMainDashboard = () => import("@/views/sidebar/dashboard/DashboardView.vue");

// Auth
const AuthSignIn4 = () => import("@/views/backend/login/SignInView.vue");


const toast = Swal.mixin({
  customClass: {
    confirmButton: 'btn btn-success me-2',
    cancelButton: 'btn btn-danger'
  },
  buttonsStyling: false
})

// Set the stores to null and initialize them inside the initStores function
// Stores
let channelStore = null;
let tempestStore = null;
const changeVersionEmitter = emitterControls('change-version-emitter');
const loginOutEmmiter = emitterControls('login-out-emitter');

// let emitter = null;
// initialize Stores here
function initStores(){
  if(!channelStore) channelStore = useChannelStore();
  if(!tempestStore) tempestStore = useTempestStore();

}
function waitForModalToClose() {
  return new Promise((resolve) => {
    emitter.on('NewCustomerModalResponse', (event) => {
      resolve(event);
    });
  });
}

// Set all routes
const routes = [
  /*
  |
  |--------------------------------------------------------------------------
  | Landing Routes
  |--------------------------------------------------------------------------
  |
  */
  {
    path: "/",
    component: LayoutSimple,
    children: [
      {
        path: "",
        name: "landing",
        component: AuthSignIn4,
        meta: {
          title: 'Tempest',
        },
      },
    ],
  },
  {
    path: "/backend",
    redirect: "/backend/dashboard",
    component: LayoutBackend,
    children: [
      {
        path: "dashboard",
        name: "backend-dashboard",
        component: BackendMainDashboard,
        meta: {
          title: 'Dashboard',
        },
      },
    ],
  },
];

// Create Router
const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: "active",
  linkExactActiveClass: "",
  scrollBehavior() {
    return { left: 0, top: 0 };
  },
  routes,
});


// NProgress
/*eslint-disable no-unused-vars*/
NProgress.configure({ showSpinner: false });

router.beforeEach(async (to, from, next) => {
  initStores();
  const hasValidCredentials = validLocalStorageCredentials();
  if(!hasValidCredentials){
    loginOutEmmiter.emit();
  }
  changeVersionEmitter.emit();
  const allowLogin = localStorage.getItem("allowLogin");
  const showModalRoutes = JSON.parse(sessionStorage.getItem('showModalRoutes') ?? 'true');
  if ((allowLogin === 'yes' && to.name !== 'landing')) {
    router.push('/');
  }
  else if (from.name !== undefined && from.name.startsWith("backend-customer-details" ) && !to.name.startsWith("backend-customer-details")) {

    if (showModalRoutes) {
      const result = await toast.fire({
        title: 'Changing Pages?',
        text: "Changes you made may not be saved",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Change Page',
        cancelButtonText: 'Cancel',
      });
      if(!result.isConfirmed){
        sessionStorage.setItem('location','');
        sessionStorage.setItem('phoneNumberList', '');
        return next(false);
      }
    }
  } else if (to.path === "/backend/customer-details") {
    // ? check if the user is part of the chat team
    if(localStorage.getItem('userDepartment') === '4'){
      return next();
    }
    // console.log(from);
    if(from.name === undefined){
      const phoneNumberList = localStorage.getItem('phoneNumberList');
      if( phoneNumberList != null && phoneNumberList != '' ){
        localStorage.setItem('phoneNumberList','');
        sessionStorage.setItem('phoneNumberList',phoneNumberList);
        return next();
      }else{
        return next('/backend/dashboard');
      }
    }
    emitter.emit('NewCustomerModalToggle',true);
    const resolve = await waitForModalToClose();
    if(resolve.message || typeof resolve.message === 'string' ){
      if(resolve.message != ''){
        const href = window.location.origin + '/#' + resolve.message;
        window.open(href, '_blank');
      }
      return next(false);
    }
    return next();

  }else {
    sessionStorage.setItem('phoneNumberList', '');
    sessionStorage.setItem('showModalRoutes',JSON.stringify(true));
  }
  return next();

});

router.beforeResolve((to, from, next) => {
  if (to.name) {
    NProgress.start();
  }
  document.title = to.meta?.title ?? 'Tempest';
  window.updateTestTabTitle();
  const userDepartment = localStorage.getItem('userDepartment');
  if(to.path === '/backend/dashboard' && userDepartment === '3' && ENV.DISPLAY_WCSA_DASHBOARD) return next('/backend/wcsa-dashboard');
  if(to.path === '/backend/wcsa-dashboard' && (userDepartment !== '3' ||!ENV.DISPLAY_WCSA_DASHBOARD) ) return next('/backend/dashboard');
  next();
});

router.afterEach((to, from) => {

  sessionStorage.setItem('servicePlanList', '');
  sessionStorage.setItem('achPaymentList', '');
  sessionStorage.setItem('creditCardList', '');

  if ((to.name === 'backend-customer-details' || to.name === 'backend-customer-details-only-cid') && to.name === from.name) {
    sessionStorage.setItem('phoneNumberList', '');
  }

  NProgress.done();
});
/*eslint-enable no-unused-vars*/

export default router;
