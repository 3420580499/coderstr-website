// 按需引入elementplus图标
import type { App } from "vue"
import { Plus } from "@element-plus/icons-vue"

const needIcons = [Plus]

export default function RegisterIcon(app: App) {
  for (const item of needIcons) {
    app.component(item.name, item)
  }
}
