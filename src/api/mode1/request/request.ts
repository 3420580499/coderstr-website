import { BASE_URT, TIME_OUT } from "./config"
import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios"

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
        // 想做的一些操作
        // 1.给请求添加token
        // 2.isLoading动画
        config.headers!.Authorization =
          "Bearer " + localStorage.getItem("token")
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
