import dayjs from "dayjs"
export function getYYYYMMDD(time: string) {
  return dayjs(time).format("YYYY年MM月DD日")
}

export function getYearAndSecond(time: string) {
  return dayjs(time).format("YYYY-MM-DD HH:mm:ss")
}

// 获取毫秒
export function getTime(time: string) {
  return dayjs(time).valueOf()
}

// 获取日期
export function getDate(time: string) {
  return dayjs(time).date()
}
// 获取2022年8月
export function getYYYYMM(time: string) {
  return dayjs(time).format("YYYY年MM月")
}