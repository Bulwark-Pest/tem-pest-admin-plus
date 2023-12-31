<script setup>
import { ref, watch, computed } from "vue";
import { useTemplateStore } from "@/stores/template";
import { useTempestStore } from "@/stores/tempest";
import BaseNavigation from "@/components/BaseNavigation.vue";
// Grab menu navigation arrays
import menu from "@/data/menu";
import Button from "primevue/button";
import MiniSidebarToggle from "@/components/atoms/MiniSidebarToggle.vue";
import TempestLogoLink from "@/components/atoms/TempestLogoLink.vue";

const navigation = menu.main;

// Component properties
defineProps({
  withMiniNav: {
    type: Boolean,
    default: true,
    description: "If the sidebar is in Mini Nav Mode",
  },
});

// Main store
const store = useTemplateStore();
const tempestStore = useTempestStore();
const version = computed(()=>tempestStore.getVersion);

// Dark Mode preference helper for radios
const radioDarkMode = ref();

const buildDate = ref(BUILD_DATE);

// Sets default dark mode preferences for radios
function setDarkModeRadioDefault() {
  if (store.settings.darkModeSystem) {
    radioDarkMode.value = "system";
  } else {
    if (store.settings.darkMode) {
      radioDarkMode.value = "dark";
    } else {
      radioDarkMode.value = "light";
    }
  }
}

// When the user sets dark mode preference through the radios
function onDarkModeRadioChange() {
  if (radioDarkMode.value === "system") {
    store.darkModeSystem({ mode: "on" });
  } else {
    store.darkModeSystem({ mode: "off" });

    if (radioDarkMode.value === "dark") {
      store.darkMode({ mode: "on" });
    } else {
      store.darkMode({ mode: "off" });
    }
  }
}

// Set dark mode preference radios default and watch for changes to store
setDarkModeRadioDefault();
watch(
  () => store.settings.darkModeSystem,
  () => {
    setDarkModeRadioDefault();
  }
);
watch(
  () => store.settings.darkMode,
  () => {
    setDarkModeRadioDefault();
  }
);

</script>

<template>
  <!-- Sidebar -->
  <nav
    id="sidebar"
    :class="{ 'with-mini-nav': withMiniNav }"
    aria-label="Main Navigation"
  >
    <!-- Side Header -->
    <div class="content-header">
      <MiniSidebarToggle />
      <TempestLogoLink />
    </div>
    <!-- END Side Header -->

    <!-- Extra -->
    <slot name="header-extra">
      <!-- Dark Mode -->
      <div class="dropdown d-inline-block ms-1 d-none">
        <button
            type="button"
            class="btn btn-sm btn-alt-secondary"
            id="sidebar-dark-mode-dropdown"
            data-bs-toggle="dropdown"
            data-bs-auto-close="outside"
            aria-haspopup="true"
            aria-expanded="false"
        >
          <i v-if="!store.settings.darkMode" class="far fa-moon"></i>
          <i v-if="store.settings.darkMode" class="fa fa-moon"></i>
        </button>
        <div
            class="dropdown-menu dropdown-menu-end dropdown-menu fs-sm smini-hide border-0 d-none"
            style="min-width: 8rem"
            aria-labelledby="sidebar-dark-mode-dropdown"
        >
          <div class="px-3 py-2 space-y-2 d-none">
            <div class="form-check">
              <input
                  class="form-check-input"
                  type="radio"
                  id="radio-dark-mode-off"
                  value="light"
                  v-model="radioDarkMode"
                  @change="onDarkModeRadioChange"
              />
              <label
                  class="form-check-label fw-medium"
                  for="radio-dark-mode-off"
              >Light</label
              >
            </div>
            <div class="form-check">
              <input
                  class="form-check-input"
                  type="radio"
                  id="radio-dark-mode-on"
                  value="dark"
                  v-model="radioDarkMode"
                  @change="onDarkModeRadioChange"
              />
              <label
                  class="form-check-label fw-medium"
                  for="radio-dark-mode-on"
              >Dark</label
              >
            </div>
            <div class="form-check mb-0">
              <input
                  class="form-check-input"
                  type="radio"
                  id="radio-dark-mode-system"
                  value="system"
                  v-model="radioDarkMode"
                  @change="onDarkModeRadioChange"
              />
              <label
                  class="form-check-label fw-medium"
                  for="radio-dark-mode-system"
              >System</label
              >
            </div>
          </div>
        </div>
      </div>
      <!-- END Dark Mode -->

      <!-- Options -->
      <div class="dropdown d-inline-block ms-1 d-none">
        <button
            type="button"
            class="btn btn-sm btn-alt-secondary"
            id="sidebar-themes-dropdown"
            data-bs-toggle="dropdown"
            data-bs-auto-close="outside"
            aria-haspopup="true"
            aria-expanded="false"
        >
          <i class="fa fa-brush"></i>
        </button>
        <div
            class="dropdown-menu dropdown-menu-end fs-sm smini-hide border-0"
            aria-labelledby="sidebar-themes-dropdown"
        >
          <!-- Color Themes -->
          <button
              type="button"
              class="dropdown-item d-flex align-items-center justify-content-between fw-medium"
              @click="store.setColorTheme({ theme: '' })"
          >
            <span>Default</span>
            <i class="fa fa-circle text-default"></i>
          </button>
          <button
              type="button"
              class="dropdown-item d-flex align-items-center justify-content-between fw-medium"
              @click="store.setColorTheme({ theme: 'amethyst' })"
          >
            <span>Amethyst</span>
            <i class="fa fa-circle text-amethyst"></i>
          </button>
          <button
              type="button"
              class="dropdown-item d-flex align-items-center justify-content-between fw-medium"
              @click="store.setColorTheme({ theme: 'city' })"
          >
            <span>City</span>
            <i class="fa fa-circle text-city"></i>
          </button>
          <button
              type="button"
              class="dropdown-item d-flex align-items-center justify-content-between fw-medium"
              @click="store.setColorTheme({ theme: 'flat' })"
          >
            <span>Flat</span>
            <i class="fa fa-circle text-flat"></i>
          </button>
          <button
              type="button"
              class="dropdown-item d-flex align-items-center justify-content-between fw-medium"
              @click="store.setColorTheme({ theme: 'modern' })"
          >
            <span>Modern</span>
            <i class="fa fa-circle text-modern"></i>
          </button>
          <button
              type="button"
              class="dropdown-item d-flex align-items-center justify-content-between fw-medium"
              @click="store.setColorTheme({ theme: 'smooth' })"
          >
            <span>Smooth</span>
            <i class="fa fa-circle text-smooth"></i>
          </button>
          <!-- END Color Themes -->

          <div v-if="!store.settings.darkMode">
            <div class="dropdown-divider"></div>

            <!-- Sidebar Styles -->
            <button
                type="button"
                class="dropdown-item fw-medium"
                @click="store.sidebarStyle({ mode: 'light' })"
            >
              <span>Sidebar Light</span>
            </button>
            <button
                type="button"
                class="dropdown-item fw-medium"
                @click="store.sidebarStyle({ mode: 'dark' })"
            >
              <span>Sidebar Dark</span>
            </button>
            <!-- END Sidebar Styles -->

            <div class="dropdown-divider"></div>

            <!-- Header Styles -->
            <button
                type="button"
                class="dropdown-item fw-medium"
                @click="store.headerStyle({ mode: 'light' })"
            >
              <span>Header Light</span>
            </button>
            <button
                type="button"
                class="dropdown-item fw-medium"
                @click="store.headerStyle({ mode: 'dark' })"
            >
              <span>Header Dark</span>
            </button>
            <!-- END Header Styles -->
          </div>
        </div>
      </div>
      <!-- END Options -->
    </slot>
    <!-- END Extra -->

    <!-- Sidebar Scrolling -->
    <div id="simplebar-sidebar" class="js-sidebar-scroll border-end border-1 border-white">
      <slot name="content">
        <!-- Side Navigation -->
        <div class="content-side">
          <BaseNavigation :nodes="navigation" />
          <div class=" d-flex flex-column align-items-center">
            <span class="text-secondary version-leyend">v.{{ version }}</span>
            <span class="text-secondary version-leyend">{{ buildDate }}</span>
          </div>
        </div>
        <!-- END Side Navigation -->
      </slot>

    </div>
    <!-- END Sidebar Scrolling -->
  </nav>
  <!-- END Sidebar -->
</template>
