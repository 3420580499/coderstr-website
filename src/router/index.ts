import { createRouter, createWebHistory } from "vue-router"
import Home from "@/views/home/home.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/home"
    },
    {
      path: "/home",
      name: "home",
      component: Home
    },
    {
      path: "/edit",
      name: "edit",
      component: () => import("@/views/editor/edit.vue")
    },
    {
      path: "/about",
      name: "about",
      component: () => import("@/views/about/about.vue")
    }
  ]
})

export default router
