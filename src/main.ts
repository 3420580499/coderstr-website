import { createApp } from "vue"
import { createPinia } from "pinia"

import App from "./App.vue"
import router from "./router"
import ElementPlus from "element-plus"
import "normalize.css"
import "@/assets/css/base.less"
import "element-plus/dist/index.css"
import "uno.css"
import RegisterIcon from "@/plugins/iconPlugin"

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(ElementPlus)
app.use(RegisterIcon)

app.mount("#app")
