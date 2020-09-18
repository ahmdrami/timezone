import { getTimeZone } from './'

describe('timexone', () => {
  test('should return the right timezone based on the Intl api', () => {
    global.window.Intl = {
      DateTimeFormat: () => {
        return {
          resolvedOptions: () => ({
            timeZone: 'America/Grand_Turk',
          }),
        }
      },
    } as any
    const tz = getTimeZone()
    expect(tz).toEqual({ code: 'TC', timezone: 'America/Grand_Turk' })
  })

  test('should return null on an invalid timezone or not found', () => {
    global.window.Intl = {
      DateTimeFormat: () => {
        return {
          resolvedOptions: () => ({
            timeZone: null,
          }),
        }
      },
    } as any
    const tz = getTimeZone()
    expect(tz).toEqual(null)
  })

  test('should return null during SSR', () => {
    global.window = null as any
    const tz = getTimeZone()
    expect(tz).toEqual(null)
  })
})
