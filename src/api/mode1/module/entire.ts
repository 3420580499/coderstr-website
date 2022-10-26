import strRequest from "../request/request"

export function getEntireRoomList(offset: number, size = 20) {
  return strRequest.get({
    url: "/entire/list",
    params: {
      offset,
      size
    }
  })
}
