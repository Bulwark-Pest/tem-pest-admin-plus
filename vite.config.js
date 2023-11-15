import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

function generateTimeStamp(){
  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();

  month = month < 10 ? '0' + month : month;
  day = day < 10 ? '0' + day : day;
  hours = hours < 10 ? '0' + hours : hours;
  minutes = minutes < 10 ? '0' + minutes : minutes;
  seconds = seconds < 10 ? '0' + seconds : seconds;

  return `${year}.${month}.${day}.${hours}.${minutes}.${seconds}`;
}
// https://vitejs.dev/config/
export default defineConfig({
  define:{
    BUILD_DATE: JSON.stringify(generateTimeStamp()),
  },
  plugins: [vue({
    template: {compilerOptions: {}}
  })],
  resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  dev: {
    port: 8010,
    host: false,
    https: true,
    watch: {
      usePolling: true
    }
  },
  build: {
    chunkSizeWarningLimit: 1600,
  },
  server: {
    watch: {
      usePolling: true
    },
    port: 8010,
    https: false
  },
  preview: {
      port: 5050,
      https: false,
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/assets/scss/tempestSCSS/_breackpoints.scss";` + `@import "@/assets/scss/tempestSCSS/_colors.scss";`
      }
    }
  }
});
