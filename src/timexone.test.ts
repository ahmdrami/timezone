import { getTimeZone } from './'

describe('timexone', () => {
  test('should return the right timezone based on the Intl api', async () => {
    global.window.Intl = {
      DateTimeFormat: () => {
        return {
          resolvedOptions: () => ({
            timeZone: 'America/Grand_Turk',
          }),
        }
      },
    } as any
    const tz = await getTimeZone()
    expect(tz).toEqual({ code: 'TC', timezone: 'America/Grand_Turk', dial: '+1649', currency_code: 'USD' })
  })

  test('should return Europe/London on an invalid timezone or not found', async () => {
    global.window.Intl = {
      DateTimeFormat: () => {
        return {
          resolvedOptions: () => ({
            timeZone: null,
          }),
        }
      },
    } as any
    const tz = await getTimeZone()
    expect(tz).toEqual({ code: 'GB', dial: '+44', timezone: 'Europe/London', currency_code: 'GBP' })
  })

  test('should return Europe/London when timezone data is no available', async () => {
    global.window.Intl = {
      DateTimeFormat: () => {
        return {
          resolvedOptions: () => ({
            timeZone: 'America/Buenos_Aires',
          }),
        }
      },
    } as any
    const tz = await getTimeZone()
    expect(tz).toEqual({ code: 'GB', dial: '+44', timezone: 'Europe/London', currency_code: 'GBP' })
  })

  test('should return default value during SSR', async () => {
    global.window = null as any
    const tz = await getTimeZone()
    expect(tz).toEqual({ code: 'GB', dial: '+44', timezone: 'Europe/London', currency_code: 'GBP' })
  })
})
