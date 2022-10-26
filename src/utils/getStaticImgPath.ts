export function getRemoteImgPath(url: string) {
  return import.meta.env.VITE_REMOTE_SERVER_BASEURL + url
}

export function getAssetImg(url: string) {
  //第一个参数：相对路径(相对于第二个参数路径)
  //第二个参数：你要相对哪一个路径，import.meta.url:当前文件路径
  // new Url('./src',import.meta.url)
  return new URL(`../assets/img/${url}`, import.meta.url).href
}
