import strRequest from "../request/request"
export function getAllSorts(): any {
  return strRequest.get({
    url: "/sort/list"
  })
}

export function getSortList(params: any): any {
  return strRequest.get({
    url: "/sort/pageList",
    params
  })
}

export function getSortDetail(params:any):any {
  return strRequest.get({
    url: "/sort/" + params.id,
  })
}

export function getModifySort(data:any):any {
  return strRequest.patch({
    url: "/sort/modify",
    data,
  })
}

export function getAddSort(data:any):any {
  return strRequest.post({
    url: "/sort/create",
    data,
  })
}
