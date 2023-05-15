import strRequest from "../request/request"
export function getTagsOfSearch(name: string) {
  return strRequest.get({
    url: "/tag/search",
    params: {
      name
    }
  })
}
export function getTagList(params:any): any {
  return strRequest.get({
    url: "/tag/pageList",
    params
  })
}

export function getTagDetail(params:any):any {
  return strRequest.get({
    url: "/tag/" + params.id,
  })
}

export function getModifyTag(data:any):any {
  return strRequest.patch({
    url: "/tag/modify",
    data,
  })
}

export function getAddTag(data:any):any {
  return strRequest.post({
    url: "/tag/create",
    data,
  })
}

export function getAllTags():any {
  return strRequest.get({
    url: "/tag/findAll",
  })
}
