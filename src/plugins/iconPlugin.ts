// 按需引入elementplus图标
import type { App } from "vue"
import {
  Plus,
  ChatLineRound,
  View,
  ArrowLeft,
  Pointer,
  CollectionTag,
  Delete,
  Edit,
  Close,
  Check
} from "@element-plus/icons-vue"

const needIcons = [Plus, ChatLineRound, View, ArrowLeft, Pointer, CollectionTag,Delete,Edit,Close,Check]

export default function RegisterIcon(app: App) {
  for (const item of needIcons) {
    app.component(item.name, item)
  }
}
