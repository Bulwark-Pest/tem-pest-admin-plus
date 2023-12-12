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
    <slot>
      <!-- Side Header -->
      <div class="content-header">
        <MiniSidebarToggle />

        <TempestLogoLink />
      </div>
      <!-- END Side Header -->

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
    </slot>
  </nav>
  <!-- END Sidebar -->
</template>
