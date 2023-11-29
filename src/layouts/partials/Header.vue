<script setup>
import Button from 'primevue/button';
import { useTemplateStore } from '@/stores/template';
import { onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import emitterControls from '@/assets/js/emitterControls';

const loginOutEmmiter = emitterControls('login-out-emitter');

// Main store and Router
const store = useTemplateStore();
const router = useRouter();

function cleanStorages() {
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
  localStorage.setItem('allowLogin', 'yes');
  localStorage.setItem('googleToken', '');
  // Store phone numbers
  sessionStorage.setItem('phoneNumberList', '');
  // Store service plan
  sessionStorage.setItem('servicePlanList', '');
  // Store locations
  sessionStorage.setItem('cid', '0');
  sessionStorage.setItem('customerDetailsLat', '0');
  sessionStorage.setItem('customerDetailsLng', '0');
  sessionStorage.setItem('customerDetailsGridName', '0');

  sessionStorage.setItem('creditCardList', '');
}

function googleSignOut() {
  cleanStorages();
  router.push('/');
}

// Get local storage
const userName = localStorage.getItem('userName');

//image and name Department Id
const userDepartment = localStorage.getItem('userDepartment');

// websocket phone call data
onMounted(async () => {
  loginOutEmmiter.subscribe(() => cleanStorages());
});

onUnmounted(() => {
  loginOutEmmiter.unsubscribe();
});

</script>

<template>
  <!-- Header -->
  <header id="page-header">
    <slot>
      <!-- Header Content -->
      <div class="content-header customContentHeader">
        <slot name="content">
          <audio id="notificationSound" class="video-js d-none" controls preload="auto" playsinline>
            <source src="/assets/media/notification/play.mp3" type="audio/mp3" />
          </audio>
          <Toast position="bottom-right" group="notification">
            <template #message="slotProps">
              <div class="d-flex gap-4" style="flex: 1">
                <i class="pi pi-exclamation-circle" style="font-size: 3rem"></i>
                <div class="flex flex-column align-items-center">
                  <strong class="font-bold text-xl my-3">{{ slotProps.message.summary }}</strong>
                  <div class="font-bold text-xl my-3">{{ slotProps.message.detail }}</div>
                  <div class="d-flex justify-content-end">
                    <Button severity="info" label="View"></Button>
                  </div>
                </div>
              </div>
            </template>
          </Toast>
          <!-- Left Section -->
          <div class="d-flex align-items-center">
            <slot name="content-left">
              <!-- Toggle Sidebar -->
              <button
                type="button"
                class="btn btn-sm btn-alt-secondary me-2 d-lg-none rounded-0"
                @click="store.sidebar({ mode: 'toggle' })"
              >
                <i class="fa fa-fw fa-bars"></i>
              </button>
              <!-- END Toggle Sidebar -->

              <!-- Open Search Section (visible on smaller screens) -->
              <div class="customLogoSizePhone">
                <img class="img img-fluid" src="/src/assets/image/tempest_logo.png" width="140" alt="Logo" />
              </div>
              <!-- END Open Search Section -->

              <!-- Search Form (visible on larger screens) -->
              <!-- END Search Form -->
            </slot>
          </div>
          <!-- END Left Section -->

          <!-- Right Section -->
          <div class="d-flex align-items-center">
            <slot name="content-right">
              <!-- User Dropdown -->
              <div class="dropdown d-inline-block">
                <button
                  type="button"
                  class="btn btn-sm btn-alt-secondary d-flex align-items-center"
                  id="page-header-user-dropdown"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <img
                    v-if="userDepartment == 1"
                    src="/src/assets/image/icons/salesCenter.jpg"
                    alt="Sales Center"
                    class="rounded-circle customImgNotes"
                  />
                  <img
                    v-if="userDepartment == 2"
                    src="/src/assets/image/icons/coldLeads.jpg"
                    alt="cold Leads"
                    class="rounded-circle customImgNotes"
                  />
                  <img
                    v-if="userDepartment == 3"
                    src="/src/assets/image/icons/wcsa.jpg"
                    alt="wcsa"
                    class="rounded-circle customImgNotes"
                  />
                  <img
                    v-if="userDepartment == 4"
                    src="/src/assets/image/icons/chatTeam.jpg"
                    alt="chat Team"
                    class="rounded-circle customImgNotes"
                  />
                  <img
                    v-if="userDepartment == 5"
                    src="/src/assets/image/icons/serviceCenter.jpg"
                    alt="service Center"
                    class="rounded-circle customImgNotes"
                  />
                  <img
                    v-if="userDepartment == 6"
                    src="/src/assets/image/icons/builderLeads.jpg"
                    alt="builder Leads"
                    class="rounded-circle customImgNotes"
                  />
                  <img
                    v-if="userDepartment == 7"
                    src="/src/assets/image/icons/other.jpg"
                    alt="other"
                    class="rounded-circle customImgNotes"
                  />
                  <img
                    v-if="userDepartment == 8"
                    src="/src/assets/image/icons/spanish.jpg"
                    alt="spanish"
                    class="rounded-circle customImgNotes"
                  />
                  <img
                    v-if="userDepartment == 9"
                    src="/src/assets/image/icons/termite.jpg"
                    alt="termite"
                    class="rounded-circle customImgNotes"
                  />
                  <img
                    v-if="userDepartment == 10"
                    src="/src/assets/image/icons/weeds.jpg"
                    alt="weeds"
                    class="rounded-circle customImgNotes"
                  />
                  <img
                    v-if="userDepartment == 11"
                    src="/src/assets/image/icons/doorSales.jpg"
                    alt="door Sales"
                    class="rounded-circle customImgNotes"
                  />
                  <img
                    v-if="userDepartment == 12"
                    src="/src/assets/image/icons/serviceProfessionals.jpg"
                    alt="service Professionals"
                    class="rounded-circle customImgNotes"
                  />
                  <img
                    v-if="userDepartment == 13"
                    src="/src/assets/image/icons/outboundSales.jpg"
                    alt="outbound Sales"
                    class="rounded-circle customImgNotes"
                  />
                  <img
                    v-if="userDepartment == 14"
                    src="/src/assets/image/icons/specialForcesSales.jpg"
                    alt="special ForcesSales"
                    class="rounded-circle customImgNotes"
                  />
                  <img
                    v-if="userDepartment == 15"
                    src="/src/assets/image/icons/inactive.jpg"
                    alt="inactive"
                    class="rounded-circle customImgNotes"
                  />

                  <span class="d-sm-inline-block ms-2">{{ userName }}</span>

                  <i class="fa fa-fw fa-angle-down d-none d-sm-inline-block opacity-50 ms-1 mt-1"></i>
                </button>
                <div
                  class="dropdown-menu dropdown-menu-md dropdown-menu-end p-0 border-0"
                  aria-labelledby="page-header-user-dropdown"
                >
                  <div class="p-3 text-center border-bottom rounded-top">
                    <img
                      v-if="userDepartment == 1"
                      src="/src/assets/image/icons/salesCenter.jpg"
                      alt="Sales Center"
                      class="img-avatar mt-2 img-avatar-thumb"
                    />
                    <img
                      v-if="userDepartment == 2"
                      src="/src/assets/image/icons/coldLeads.jpg"
                      alt="cold Leads"
                      class="img-avatar mt-2 img-avatar-thumb"
                    />
                    <img
                      v-if="userDepartment == 3"
                      src="/src/assets/image/icons/wcsa.jpg"
                      alt="wcsa"
                      class="img-avatar mt-2 img-avatar-thumb"
                    />
                    <img
                      v-if="userDepartment == 4"
                      src="/src/assets/image/icons/chatTeam.jpg"
                      alt="chat Team"
                      class="img-avatar mt-2 img-avatar-thumb"
                    />
                    <img
                      v-if="userDepartment == 5"
                      src="/src/assets/image/icons/serviceCenter.jpg"
                      alt="service Center"
                      class="img-avatar mt-2 img-avatar-thumb"
                    />
                    <img
                      v-if="userDepartment == 6"
                      src="/src/assets/image/icons/builderLeads.jpg"
                      alt="builder Leads"
                      class="img-avatar mt-2 img-avatar-thumb"
                    />
                    <img
                      v-if="userDepartment == 7"
                      src="/src/assets/image/icons/other.jpg"
                      alt="other"
                      class="img-avatar mt-2 img-avatar-thumb"
                    />
                    <img
                      v-if="userDepartment == 8"
                      src="/src/assets/image/icons/spanish.jpg"
                      alt="spanish"
                      class="img-avatar mt-2 img-avatar-thumb"
                    />
                    <img
                      v-if="userDepartment == 9"
                      src="/src/assets/image/icons/termite.jpg"
                      alt="termite"
                      class="img-avatar mt-2 img-avatar-thumb"
                    />
                    <img
                      v-if="userDepartment == 10"
                      src="/src/assets/image/icons/weeds.jpg"
                      alt="weeds"
                      class="img-avatar mt-2 img-avatar-thumb"
                    />
                    <img
                      v-if="userDepartment == 11"
                      src="/src/assets/image/icons/doorSales.jpg"
                      alt="door Sales"
                      class="img-avatar mt-2 img-avatar-thumb"
                    />
                    <img
                      v-if="userDepartment == 12"
                      src="/src/assets/image/icons/serviceProfessionals.jpg"
                      alt="service Professionals"
                      class="img-avatar mt-2 img-avatar-thumb"
                    />
                    <img
                      v-if="userDepartment == 13"
                      src="/src/assets/image/icons/outboundSales.jpg"
                      alt="outbound Sales"
                      class="img-avatar mt-2 img-avatar-thumb"
                    />
                    <img
                      v-if="userDepartment == 14"
                      src="/src/assets/image/icons/specialForcesSales.jpg"
                      alt="special ForcesSales"
                      class="img-avatar mt-2 img-avatar-thumb"
                    />
                    <img
                      v-if="userDepartment == 15"
                      src="/src/assets/image/icons/inactive.jpg"
                      alt="inactive"
                      class="img-avatar mt-2 img-avatar-thumb"
                    />

                    <p class="mt-2 mb-0 fw-medium">{{ userName }}</p>
                    <p id="nameDepartments" class="mb-0 text-muted fs-sm fw-medium">Salesman</p>
                  </div>
                  <div class="p-2">
                    <a
                      @click.prevent="googleSignOut()"
                      class="dropdown-item d-flex align-items-center justify-content-between btn btn-claret"
                    >
                      <span class="fs-sm fw-medium"><i class="fa fa-sign-out"></i>Log Out</span>
                    </a>
                  </div>
                </div>
              </div>
              <!-- END User Dropdown -->
            </slot>
          </div>
          <!-- END Right Section -->
        </slot>
      </div>
      <!-- END Header Content -->

      <!-- Header Search -->
      <div
        id="page-header-image"
        class="overlay-header bg-body-extra-light d-none"
        :class="{ show: store.settings.headerSearch }"
      >
        <div class="content-header"></div>
      </div>
      <!-- END Header Search -->

      <!-- Header Loader -->
      <div
        id="page-header-loader"
        class="overlay-header bg-body-extra-light"
        :class="{ show: store.settings.headerLoader }"
      >
        <div class="content-header">
          <div class="w-100 text-center">
            <i class="fa fa-fw fa-circle-notch fa-spin"></i>
          </div>
        </div>
      </div>
      <!-- END Header Loader -->
    </slot>
  </header>
  <!-- END Header -->
</template>
<style lang="scss">
@media (max-width: 575px) {
  .boxMenuSearch {
    display: block !important;
    .buttonBarRight {
      display: none;
    }
  }
}
</style>
