import strRequest from "../request/request"

export function getHomeGoodPriceData() {
  return strRequest.get({
    url: "/home/goodprice"
  })
}
export function getHomeHighScoreData() {
  return strRequest.get({
    url: "/home/highscore"
  })
}

export function getHomeDiscountData() {
  return strRequest.get({
    url: "/home/discount"
  })
}
