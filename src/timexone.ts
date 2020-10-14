import { TimeXone, TimeXones } from './timexone.models'

export const getTimeZone = (): Promise<TimeXone | null> => {
  return new Promise((resolve) => {
    import('./zones.json').then((data) => {
      const zones: TimeXones = data as any
      let timeZone = 'Europe/London' // default value

      if (!zones) {
        throw new Error('zones are not loaded')
      }

      if (typeof window === 'object') {
        timeZone = window.Intl.DateTimeFormat().resolvedOptions().timeZone || timeZone
      }

      resolve(zones[timeZone])
    })
  })
}
