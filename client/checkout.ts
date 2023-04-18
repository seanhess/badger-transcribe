import { FileInfo, fileSizeMb, Mb, Bytes, formatBytes } from "./file";

export type USD = number

export function totalCost(file:FileInfo):USD {
  let mb = fileSizeMb(file)
  let units = mb / UNIT
  let cost = Math.ceil(units * PRICE_PER_UNIT)
  return Math.max(1, cost)
}

const UNIT:Mb = 10
type Units = number

export const PRICE_PER_UNIT:USD = 1

export function unitPrice():string {
  return "$" + PRICE_PER_UNIT + " / " + UNIT + "MB"
}

export function totalUnits(file:FileInfo):Units {
  let mb:Mb = fileSizeMb(file)
  let units = mb / 10
  return units
}