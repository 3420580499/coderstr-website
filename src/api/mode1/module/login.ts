import strRequest from "../request/request"
// 用户登录
export function userLogin(data: any) {
  return strRequest.post({
    url: "/user/login",
    data: {
      ...data
    }
  })
}
export function userRegister(data: any): any {
  return strRequest.post({
    url: "/user/create",
    data: {
      ...data
    }
  })
}

export function userByToken() {
  return strRequest.get({
    url: "/user/jwt"
  })
}
