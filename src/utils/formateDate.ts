import dayjs from "dayjs"
export function getYYYYMMDD(time: string) {
  return dayjs(time).format("YYYY年MM月DD日")
}
