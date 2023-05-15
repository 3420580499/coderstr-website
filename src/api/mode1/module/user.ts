import strRequest from "../request/request"
export function getUpdateUser(data: any): any {
  return strRequest.patch({
    url: "/user/update",
    data
  })
}
export function getUserList(params:any): any {
  return strRequest.get({
    url: "/user/list",
    params
  })
}

export function getUserDetail(params:any):any {
  return strRequest.get({
    url: "/user/" + params.id,
  })
}

export function getModifyUser(data:any):any {
  return strRequest.patch({
    url: "/user/modify",
    data,
  })
}
