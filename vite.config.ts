import { fileURLToPath, URL } from "node:url"

import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"

import Unocss from "unocss/vite"
import { presetUno, presetAttributify, presetIcons } from "unocss"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    Unocss({
      // unocss相当于是集成了tailwindcss和windicss
      // unocss同样支持定制化
      // 这里先使用3个预设
      // 第一个是工具类预设，第二个是属性化模式支持，第三个是icon支持
      presets: [presetUno(), presetAttributify(), presetIcons()]
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  }
})
