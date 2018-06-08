export function getMinIndex(array:number[]) {
  console.log(array, Math.min.apply((<any>Math), array))
  return array.indexOf(Math.min.apply((<any>Math), array))
}