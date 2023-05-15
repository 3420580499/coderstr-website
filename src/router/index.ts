import { createRouter, createWebHistory } from "vue-router"
import Home from "@/views/home/home.vue"
import { userByToken } from "@/api/mode1/index"
import local from "@/utils/localStorage"
import { ElMessage } from "element-plus"

export const mineChildren = [
  {
    path: "",
    redirect: "/mine/user"
  },
  {
    path: "user",
    name: "user",
    component: () => import("@/views/mine/user/user.vue"),
    title: "我的资料",
    permission:['readers','author','admin']
  },
  {
    path: "overview",
    name: "overview",
    component: () => import("@/views/mine/overview/overview.vue"),
    title: "我的数据",
    permission:['author','admin']
  },
  {
    path: "my-post",
    name: "my-post",
    component: () => import("@/views/mine/mypost/index.vue"),
    title: "我的文章",
    permission:['author','admin']
  }
]

export const adminInMineChildren = [
  {
    path: "user-manage",
    name: "user-manage",
    component: () => import("@/views/mine/manage/user.vue"),
    title: "用户管理",
    permission:['admin']
  },
  {
    path: "sort-manage",
    name: "sort-manage",
    component: () => import("@/views/mine/manage/sort.vue"),
    title: "分类管理",
    permission:['admin']

  },
  {
    path: "tag-manage",
    name: "tag-manage",
    component: () => import("@/views/mine/manage/tag.vue"),
    title: "标签管理",
    permission:['admin']
  },
  {
    path: "check-post",
    name: "check-post",
    component: () => import("@/views/mine/manage/checkpost.vue"),
    title: "文章审核",
    permission:['admin']
  },
]
console.log(mineChildren.concat(adminInMineChildren));


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/home",
      name: "home",
      component: Home
    },
    {
      path: "/edit",
      name: "edit",
      component: () => import("@/views/editor/edit.vue"),
      meta: {
        hiddenHead: true
      }
    },
    {
      path: "/check/:id",
      name: "check",
      component: () => import("@/views/check/check.vue"),
      meta: {
        hiddenHead: true
      }
    },
    {
      path: "/about/:id",
      name: "about",
      component: () => import("@/views/about/about.vue")
    },
    {
      path: "/dynamic",
      name: "dynamic",
      component: () => import("@/views/dynamic/dynamic.vue")
    },
    {
      path: "/mine",
      name: "mine",
      component: () => import("@/views/mine/mine.vue"),
      children: mineChildren.concat(adminInMineChildren)
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/login/login.vue"),
      meta: {
        hiddenHead: true
      }
    }
  ]
})
const canVisitRouteName = ["login", "home", "about"]
// 验证token是否有效（无效就重新登录）
router.beforeEach(async (to, from) => {
  // 登录页面不需要拦截
  console.log(to)
  if (canVisitRouteName.includes(to.name as any)) return
  // 是否有token
  if (!local.getItem("token")) {
    ElMessage.error("请先登录")
    return "/login"
  }
  // token是否合法
  const result = await userByToken()
  if (!result) {
    local.delAll()
    return "/login"
  }
})

export default router
