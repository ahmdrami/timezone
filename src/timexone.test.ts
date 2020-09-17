import { getTimeZone } from './'

describe('timexone', () => {
  test('should return the right timezone based on the arg', () => {
    const tz = getTimeZone('America/Grand_Turk')
    expect(tz).toEqual({ code: 'TC', timezone: 'America/Grand_Turk' })
  })

  test('should return null on an invalid timezone', () => {
    const tz = getTimeZone('America/Gran')
    expect(tz).toEqual(null)
  })
})
