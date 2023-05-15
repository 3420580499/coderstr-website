import strRequest from "../request/request"

export function getCreateComment(info: any) {
  console.log(1)
  return strRequest.post({
    url: "/comment/create",
    data: { ...info }
  })
}
