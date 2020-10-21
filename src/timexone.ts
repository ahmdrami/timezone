import { TimeXone, TimeXones } from './timexone.models'

export const getTimeZone = (defaultTimeZone = 'Europe/London'): Promise<TimeXone | null> => {
  return new Promise((resolve) => {
    import('./zones.json').then((data) => {
      const zones: TimeXones = data as any
      let timeZone = defaultTimeZone
      if (!zones) {
        throw new Error('zones are not loaded')
      }

      if (typeof window === 'object') {
        timeZone = window.Intl.DateTimeFormat().resolvedOptions().timeZone
      }

      if (zones[timeZone]) {
        resolve(zones[timeZone])
      } else {
        resolve(zones[defaultTimeZone])
      }
    })
  })
}
