<script setup>
import { computed } from "vue";
import { useTemplateStore } from "@/stores/template";

// Import all layout partials
import Header from "@/components/organisms/Header.vue";
import Sidebar from "@/components/organisms/Sidebar.vue";
import SideOverlay from "@/components/organisms/SideOverlay.vue";
import Footer from "@/components/organisms/Footer.vue";
import { useChannelStore } from "@/stores/channelStore.js";
import { CHANNELS, SUBCHANNELS} from "@/assets/constants/channels.constants.js";
import ModalManager from "@/components/modals/ModalManager.vue";
// Component properties
defineProps({
  sidebarWithMiniNav: {
    type: Boolean,
    default: false,
    description: "If the sidebar is in Mini Nav Mode",
  },
});

// Main store
const store = useTemplateStore();
const channelStore = useChannelStore();
// Set default color theme
store.setColorTheme({
  theme: store.settings.colorTheme,
});

// Render main classes based on store options
const classContainer = computed(() => {
  return {
    "sidebar-r": store.layout.sidebar && !store.settings.sidebarLeft,
    "sidebar-mini": store.layout.sidebar && store.settings.sidebarMini,
    "sidebar-o": store.layout.sidebar && store.settings.sidebarVisibleDesktop,
    "sidebar-o-xs": store.layout.sidebar && store.settings.sidebarVisibleMobile,
    "sidebar-dark":
      store.layout.sidebar &&
      store.settings.sidebarDark &&
      !store.settings.darkMode,
    "side-overlay-o":
      store.layout.sideOverlay && store.settings.sideOverlayVisible,
    "side-overlay-hover":
      store.layout.sideOverlay && store.settings.sideOverlayHoverable,
    "enable-page-overlay":
      store.layout.sideOverlay && store.settings.pageOverlay,
    "page-header-fixed": store.layout.header && store.settings.headerFixed,
    "page-header-dark":
      store.layout.header &&
      store.settings.headerDark &&
      !store.settings.darkMode,
    "main-content-boxed": store.settings.mainContent === "boxed",
    "main-content-narrow": store.settings.mainContent === "narrow",
    "rtl-support": store.settings.rtlSupport,
    "side-trans-enabled": store.settings.sideTransitions,
    "side-scroll": true,
    "sidebar-dark page-header-light light-mode": store.settings.darkMode,
    "slice-left": !!channelStore.getElement(CHANNELS.OPERATIONS, SUBCHANNELS.MESSAGES, 'isShowingSlice'),
  };
});

// Change dark mode based on dark mode system preference
if (store.settings.darkModeSystem) {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    store.darkMode({ mode: "on" });
  } else {
    store.darkMode({ mode: "off" });
  }
}

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (e) => {
    if (store.settings.darkModeSystem) {
      if (e.matches) {
        store.darkMode({ mode: "on" });
      } else {
        store.darkMode({ mode: "off" });
      }
    }
  });

</script>

<template>
  <div id="page-container" :class="classContainer">
   <!-- Modal Manager  -->
    <ModalManager/>
    <!-- Page Loader -->
    <div id="page-loader" :class="{ show: store.settings.pageLoader }"></div>

    <!-- Page Overlay -->
    <div
      id="page-overlay"
      v-if="store.layout.sideOverlay && store.settings.pageOverlay"
      @click="store.sideOverlay({ mode: 'close' })"
    ></div>
    <!-- END Page Overlay -->

    <!-- Side Overlay -->
    <SideOverlay v-if="store.layout.sideOverlay">
      <template #header>
        <slot name="side-overlay-header"></slot>
      </template>

      <template #content>
        <slot name="side-overlay-content"></slot>
      </template>

      <slot name="side-overlay"></slot>
    </SideOverlay>
    <!-- END Side Overlay -->

    <!-- Sidebar -->
    <Sidebar
      v-if="store.layout.sidebar"
      :with-mini-nav="sidebarWithMiniNav"
    >
      <template #header-extra>
        <slot name="sidebar-header-extra"></slot>
      </template>

      <template #content>
        <slot name="sidebar-content"></slot>
      </template>

      <slot name="sidebar"></slot>
    </Sidebar>
    <!-- END Sidebar -->

    <!-- Header -->
    <Header v-if="store.layout.header">
      <template #content-left>
        <slot name="header-content-left"></slot>
      </template>

      <template #content-right>
        <slot name="header-content-right"></slot>
      </template>

      <template #content>
        <slot name="header-content"></slot>
      </template>
      <slot name="header"></slot>
    </Header>
    <!-- END Header -->

    <!-- Main Container -->
    <div id="main-container" >
      <slot name="page-top-content"></slot>
      <RouterView />
    </div>
    <!-- END Main Container -->


  </div>
  <!-- Footer -->
  <Footer v-if="store.layout.footer">

    <template #content-left>
      <slot name="footer-content-left"></slot>
    </template>

    <template #content-right>
      <slot name="footer-content-right"></slot>
    </template>
    <slot name="footer"></slot>

  </Footer>
  <!-- END Footer -->
</template>
