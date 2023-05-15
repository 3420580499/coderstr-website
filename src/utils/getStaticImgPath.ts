// 后台服务器地址
export function getRemoteImgPath(url: string) {
  return import.meta.env.VITE_REMOTE_SERVER_BASEURL + url
}

// vite静态图片访问
export function getAssetImg(url: string) {
  //第一个参数：相对路径(相对于第二个参数路径)
  //第二个参数：你要相对哪一个路径，import.meta.url:当前文件路径
  // new Url('./src',import.meta.url)
  return new URL(`../assets/img/${url}`, import.meta.url).href
}

// 登录滑块验证的图片地址
export function getLoginSliderImg() {
  return import.meta.env.VITE_REMOTE_IMAGE_ACCESS_URL
}
