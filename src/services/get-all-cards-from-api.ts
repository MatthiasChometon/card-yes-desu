import type { YgoprodeckApiCardType } from "../types/ygoprodeck-api-card.type";
import { dateToMonthDayYear } from "./date-to-month-day-year";

interface Options {
  fromDate: Date | null
}

function createFromDateToNowOption (fromDate: Date): string {
  const now = dateToMonthDayYear(new Date())
  const fromDateFormatted = dateToMonthDayYear(fromDate)

  return `&startdate=${fromDateFormatted}&enddate=${now}`
}

export async function getAllCardsFromApi ({ fromDate = null }: Options): Promise<YgoprodeckApiCardType[] | null> {
  let urlOptions = ''
  if (fromDate !== null) urlOptions += createFromDateToNowOption(fromDate)

  const response = await fetch(`https://db.ygoprodeck.com/api/v7/cardinfo.php?${urlOptions}`)
  if (response.status !== 200) return null
  const { data } = await response.json();
  return data
}
