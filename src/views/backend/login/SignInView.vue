<script setup lang="ts">
import { useRouter } from "vue-router";
import { useTemplateStore } from "@/stores/template";
import {GoogleSignInButton, type CredentialResponse} from "vue3-google-signin";
import { ref, onMounted, computed } from "vue";
import { useUserLoginStore } from '@/stores/userLogin';


// Main store and Router
const store          = useTemplateStore();
const router         = useRouter();
const allowLogin     = localStorage.getItem("allowLogin");
const userLoginStore = useUserLoginStore();

const getLoginData   = computed(() => {
  return userLoginStore.getLoginData();
});

const loginData = computed(() => {
  return userLoginStore.loginData;
});


// handle success event
const handleLoginSuccess = (response: CredentialResponse) => {
  const { credential } = response;
  localStorage.setItem("googleToken", credential);

  //console.log(credential);
  userLoginStore.fetchLoginData(credential).then(({data}) => {

    if (data.code == 1) {
      localStorage.setItem("allowLogin", 'no');

      // set User localstorage
      localStorage.setItem('userName', data.name);
	    localStorage.setItem('userEmail', data.email);
      localStorage.setItem('userCode', data.code);
      localStorage.setItem('userSalesmanId', data.salesmanId);
      localStorage.setItem('mainUserId', data.salesmanId);
      localStorage.setItem('userActive', data.active);
      localStorage.setItem('userDepartment', data.department);
      localStorage.setItem('userExtension', data.extension);
      localStorage.setItem('userRole', data.role);
      localStorage.setItem('userMainRole', data.role);
      localStorage.setItem('userHrEmpId', data.hrEmpId);
      localStorage.setItem('userPhoneNumber', data.phoneNumber === undefined ? '4809697474': data.phoneNumber);

      // Store phone numbers
      sessionStorage.setItem('phoneNumberList', '');

      // Store credit cards
      sessionStorage.setItem('creditCardList', '');
      // Store locations

      sessionStorage.setItem('cid', '0');
      sessionStorage.setItem('customerDetailsLat', '0');
      sessionStorage.setItem('customerDetailsLng', '0');
      sessionStorage.setItem('customerDetailsGridName', '0');

      router.push('/backend/dashboard');
    }
    else {
      localStorage.setItem("allowLogin", 'yes');
    }
  });
};

// handle an error event
const handleLoginError = () => {
  console.error("Login failed");
};

onMounted(() => {
  //userLoginStore.fetchUsers();
  const googleToken = localStorage.getItem("googleToken");

  if (googleToken != '0' && googleToken != null) {
    userLoginStore.fetchLoginData(googleToken);
  }
  else {
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
  }
  if (allowLogin === 'no') {
    router.push('/backend/dashboard');
  }
  else {
    router.push('/');
  }
});
</script>

<template>
  <!-- Page Content -->

  <BaseBackground image="/assets/background-main-14b5249a.jpg">
<!--  <BaseBackground image="/assets/media/photos/photo28@2x.jpg">-->
    <div class="row g-0 ">
      <!-- Meta Info Section -->
      <div
        class="hero-static col-lg-4 d-none d-lg-flex flex-column justify-content-center backFilterBlur text-end"
      >
        <div class="p-4 p-xl-5 flex-grow-1 d-flex align-items-center">
          <div class="w-100 text-end">
              <img class="img img-fluid" src="/src/assets/image/tempest_logo.png">
            <p class="text-white-75  ">
              Bulwark's Sales Platform...
            </p>
          </div>
        </div>
        <div
          class="p-4 p-xl-5 d-xl-flex justify-content-between align-items-center fs-sm"
        >
          <p class="fw-medium text-white-50 mb-0 d-none">
            <strong>{{ store.app.name + " " + store.app.version }}</strong>
            &copy; {{ store.app.copyright }}
          </p>
          <ul class="list list-inline mb-0 py-2 text-start">
            <li class="list-inline-item">
              <a class="text-white-75 fw-medium" href="javascript:void(0)"
                >Legal</a
              >
            </li>
            <li class="list-inline-item">
              <a class="text-white-75 fw-medium" href="javascript:void(0)"
                >Contact</a
              >
            </li>
            <li class="list-inline-item">
              <a class="text-white-75 fw-medium" href="javascript:void(0)"
                >Terms</a
              >
            </li>
          </ul>
        </div>
      </div>
      <!-- END Meta Info Section -->

      <!-- Main Section -->
      <div class="hero-static col-lg-8 d-flex flex-column align-items-center backgroundTheme backgroundBlack    " style="background:#006834a6">
        <div class=" backBlackText  backgroundGreen m-auto" style="border-radius:10px;">
          <div class="p-3 w-100 d-lg-none text-center ">
            <img class="img img-fluid" src="/src/assets/image/tempest_logo.png">
          </div>
          <div class="p-4 w-100 flex-grow-1 d-flex align-items-center">
            <div class="w-100">
              <!-- Header -->
              <div class="text-center mb-3">
                <i class="fa fa-2x  fa-lock mb-4"></i>
                <h1 class="fw-bold mb-2">Google Sign In</h1>
                <p class="fw-medium text-muted text-white-75">
                  Welcome back!
                </p>
                <div v-if="loginData.active == 0" class="alert alert-danger">
                  Hello {{loginData.name}}, you are not allowed to access, <br> please contact an administrator.
                </div>
                <div v-else-if="loginData.active" class="alert alert-success">
                  Welcome {{loginData.name}}.
                </div>
                <div v-else class="alert alert-success">
                  Please use your Google account to login.
                </div>
                <div >
                  <GoogleSignInButton class="customLoginGoogle"
                      @success="handleLoginSuccess"
                      @error="handleLoginError"
                  ></GoogleSignInButton>
                </div>
              </div>
              <!-- END Header -->
            </div>
          </div>
          <div
              class="px-4 py-3 w-100 d-lg-none d-flex flex-column flex-sm-row justify-content-between text-start fs-sm  text-sm-start "
          >
            <p class="fw-medium text-black-50 py-2 mb-0 ">
              <strong>{{ store.app.name + " " + store.app.version }}</strong>
              &copy; {{ store.app.copyright }}
            </p>
            <ul class="list list-inline py-2 mb-0 text-start">
              <li class="list-inline-item">
                <a class="text-muted fw-medium" href="javascript:void(0)"
                >Legal</a
                >
              </li>
              <li class="list-inline-item">
                <a class="text-muted fw-medium" href="javascript:void(0)"
                >Contact</a
                >
              </li>
              <li class="list-inline-item">
                <a class="text-muted fw-medium" href="javascript:void(0)"
                >Terms</a
                >
              </li>
            </ul>
          </div>
        </div>

      </div>
      <!-- END Main Section -->
    </div>
  </BaseBackground>
  <!-- END Page Content -->
</template>
