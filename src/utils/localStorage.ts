class localUtil {
  getItem(key: string) {
    return JSON.parse(localStorage.getItem(key)!)
  }
  setItem(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
  }
  delItem(key: string) {
    localStorage.removeItem(key)
  }
  delAll() {
    localStorage.clear()
  }
  hasItem(key: string) {
    return !!localStorage.getItem(key)
  }
}
const local = new localUtil()
export default local
