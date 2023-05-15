import { fileURLToPath, URL } from "node:url"

import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"
import AutoImport from "unplugin-auto-import/vite"
import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"

import Unocss from "unocss/vite"
import { presetUno, presetAttributify, presetIcons } from "unocss"

// https://vitejs.dev/config/
export default defineConfig({
  // 静态资源基础路径 base: './' || '',
  // base: process.env.NODE_ENV === "production" ? "./" : "/",
  plugins: [
    vue(),
    vueJsx(),
    Unocss({
      // unocss相当于是集成了tailwindcss和windicss
      // unocss同样支持定制化
      // 这里先使用3个预设
      // 第一个是工具类预设，第二个是属性化模式支持，第三个是icon支持
      presets: [presetUno(), presetAttributify(), presetIcons()]
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()]
    }),
    Components({
      resolvers: [ElementPlusResolver()]
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  },
  server: {
    hmr: {
      overlay: false
    }
  }
})
