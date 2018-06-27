export function getMinIndex(array: number[]): number {
  return array.indexOf(Math.min.apply((<any>Math), array))
}

export function getMaxIndex(array: number[]): number {
  return array.indexOf(Math.max.apply((<any>Math), array))
}