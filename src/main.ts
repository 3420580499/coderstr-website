import { createApp } from "vue"
import { createPinia } from "pinia"

import App from "./App.vue"
import router from "./router"
import ElementPlus from "element-plus"
import zhCn from "element-plus/es/locale/lang/zh-cn";
import "normalize.css"
import "@/assets/css/base.less"
import "element-plus/dist/index.css"
import "uno.css"
import RegisterIcon from "@/plugins/iconPlugin"

import SliderVerify from "slider-verify-v3"
import "slider-verify-v3/lib/SliderVerify.css"
import "atropos/css"

const app = createApp(App)

app.use(ElementPlus, {
  locale: zhCn,
});
app.use(SliderVerify)
app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.use(RegisterIcon)

app.mount("#app")

console.log(import.meta.env)
