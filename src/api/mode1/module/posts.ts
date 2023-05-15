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

export function getSortPostsList(
  sortId: string,
  page: number,
  size: number,
  rule: number
) {
  return strRequest.get({
    url: "/posts/sort/" + sortId,
    params: {
      page,
      size,
      rule
    }
  })
}

export function getPostsCount() {
  return strRequest.get({
    url: "/posts/overview/postsCount"
  })
}

export function getLikeAndReadCount() {
  return strRequest.get({
    url: "/posts/overview/likeAndReadCount"
  })
}

export function getLikeTop() {
  return strRequest.get({
    url: "/posts/overview/likeTop"
  })
}

export function getReadTop() {
  return strRequest.get({
    url: "/posts/overview/readTop"
  })
}

export function getAddReadCount(params:any) {
  return strRequest.get({
    url: "/posts/addRead/" + params.id
  })
}

// 分页文章列表
export function getPagePostList(params:any) {
  return strRequest.get({
    url: "/posts/list",
    params
  })
}

// 文章审核
export function getCheckPost(data:any):any {
  return strRequest.post({
    url: "/posts/check",
    data
  })
}

// 审核文章时的 明细
export function getpostContent(params: any):any {
  return strRequest.get({
    url: "/posts/info/" + params.postId,
  })
}

// 查看文章时的 明细
export function getMyPostContent(params: any):any {
  return strRequest.get({
    url: "/posts/mypost/" + params.postId,
  })
}

// 分页 我的文章列表
export function getMyPagePostList(params:any) {
  return strRequest.get({
    url: "/posts/mylist",
    params
  })
}
