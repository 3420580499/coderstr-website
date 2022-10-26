import strRequest from "../request/request"
export function createPosts(data: any) {
  return strRequest.post({
    url: "/posts/create",
    data: {
      ...data
    }
  })
}

export function updatePosts(id: string, data: any) {
  return strRequest.patch({
    url: "/posts/update/" + id,
    data: {
      ...data
    }
  })
}

export function getPostsById(id: string) {
  return strRequest.get({
    url: "/posts/" + id
  })
}
