import strRequest from "../request/request"
export function getTagsOfSearch(name: string) {
  return strRequest.get({
    url: "/tag/search",
    params: {
      name
    }
  })
}
