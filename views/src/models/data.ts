export const globalData = {
  headerAnimationDone: false
}
export function changeGlobal(key:string, value: any){
  globalData[key] = value
}