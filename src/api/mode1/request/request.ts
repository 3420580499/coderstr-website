import { BASE_URT, TIME_OUT } from "./config"
import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios"
import { ElMessage } from "element-plus"
import local from "@/utils/localStorage"

interface RequestInterface {
  instance: AxiosInstance
}

class StrRequest implements RequestInterface {
  instance: AxiosInstance

  constructor(baseURL: string, timeout: number) {
    this.instance = axios.create({
      baseURL,
      timeout
    })

    this.instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        const token = local.getItem("token")
        // 想做的一些操作
        // 1.给请求添加token
        // 2.isLoading动画
        config.headers!.Authorization = "Bearer " + (token ? token : "")
        // config.headers!.id = localStorage.getItem("id")
        return config
      },
      (err) => {
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        return res.data
      },
      (err) => {
        console.log(err)
        if (err.response.data.statusCode === 401) {
          ElMessage.error("用户没有权限")
          setTimeout(() => {
            if(location.pathname !== '/login') {
              location.href = '/login'
            }
          },100)
        }
        else if (err.response.data.error === "Unauthorized") {
          ElMessage.error("登录过期，请重新登录")
        }
        else ElMessage.error(err.response.data.error)
      }
    )
  }
  request(axiosRequestConfig: AxiosRequestConfig) {
    return this.instance.request(axiosRequestConfig)
  }
  get(config: AxiosRequestConfig) {
    return this.request({ ...config, method: "GET" })
  }
  post(config: AxiosRequestConfig) {
    return this.request({ ...config, method: "POST" })
  }
  put(config: AxiosRequestConfig) {
    return this.request({ ...config, method: "PUT" })
  }
  delete(config: AxiosRequestConfig) {
    return this.request({ ...config, method: "DELETE" })
  }
  patch(config: AxiosRequestConfig) {
    return this.request({ ...config, method: "PATCH" })
  }
}

const strRequest = new StrRequest(BASE_URT, TIME_OUT)
export default strRequest
