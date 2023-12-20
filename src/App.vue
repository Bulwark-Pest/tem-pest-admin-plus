<script setup lang="js">

import { onMounted, onUnmounted,ref } from "vue";
import { useResizeStore } from "@/stores/resizeStore";
import emitterControls from "./assets/js/emitterControls";
import {useTempestStore} from './stores/tempest';
import Swal from "sweetalert2";
import { subscribeAuthValidation,UnsubscribeAuthValidation } from "./services/auth.service";
import { useRouter } from "vue-router";

let toast = Swal.mixin({
  buttonsStyling : false,
  target         : "#page-container",
  customClass    : {
    confirmButton: "btn btn-claret m-1",
    cancelButton : "btn btn-danger m-1",
    input        : "form-control",
  },
  allowOutsideClick: false,
});

const resizeStore = useResizeStore();
const tempestStore = useTempestStore();
const firstCheck = ref(true);
const loginOutEmmiter = emitterControls('login-out-emitter');
const router = useRouter();

resizeStore.setEvent();
resizeStore.resizeEvent();

async function checkUpdate(){

  const currentVersion = localStorage.getItem('version');
  const newVersion = await tempestStore.checkVersionUpdate();
  if(currentVersion !== newVersion ){
    localStorage.setItem('version',newVersion);
    if(!firstCheck.value){
      toast.fire({
        'icon': "warning",
        'titleText': "New Update Available!",
        'html': 'refreshing the page!'
      }).then(()=>{
        window.location.reload();
      });
    }
  }
  firstCheck.value = false;
}

onMounted(() => {
  subscribeAuthValidation((event)=>{
    loginOutEmmiter.emit();
    router.push('/');
  });
});

onUnmounted(() => {
  resizeStore.removeEvent();
  UnsubscribeAuthValidation();
});
</script>

<template>
  <RouterView />
  <div id="overlayBack">
    <div class="overlayBack">
      <div class="backgroundBlue customLoadingBox">
        <img src="/src/assets/image/icons/loading-gif.gif" />
        <h4>Please wait!</h4>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
// Main Stylesheet
@import "@/assets/scss/main";

// All color themes are included and available by default
// Feel free to comment out any of them if you won't use them in your project

@import "@/assets/scss/oneui/themes/amethyst";
@import "@/assets/scss/oneui/themes/city";
@import "@/assets/scss/oneui/themes/flat";
@import "@/assets/scss/oneui/themes/modern";
@import "@/assets/scss/oneui/themes/smooth";
</style>


