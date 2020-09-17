import { TimeXone, TimeXones } from './timexone.models'
import data from './zones.json'

export const getTimeZone = (): TimeXone | null => {
  const zones: TimeXones = data
  let timeZone

  if (!zones) {
    throw new Error('zones are not loaded')
  }

  if (typeof window === 'object') {
    timeZone = window.Intl.DateTimeFormat().resolvedOptions().timeZone
  }

  if (!timeZone || !zones[timeZone]) {
    return null
  }

  return zones[timeZone]
}
