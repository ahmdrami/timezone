import { TimeXone, TimeXones } from './timexone.models'
import data from './zones.json'

export const getTimeZone = (timezone: string): TimeXone | null => {
  const zones: TimeXones = data
  if (!zones) {
    throw new Error('zones are not loaded')
  }
  if (!timezone) {
    throw new Error('timezone is not provided')
  }
  const tz: any = zones[timezone]

  if (tz) {
    return tz
  }
  return null
}
