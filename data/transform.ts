import fs from 'fs'
import readline from 'readline'
import path from 'path'
import { TimeXones } from '../src/timexone.models'

const output = fs.createWriteStream('src/zones.json')

const timezones: TimeXones = {}
const countries: { [key: string]: { iso_code: string; dial: string; currency_code: string } } = {}

const formatCountries = async () => {
  const countriesReader = readline.createInterface({
    input: fs.createReadStream(path.resolve('data/countries.csv')),
  })
  const interestedHeaders: { [key: string]: any } = {
    Dial: { name: 'Dial', index: -1 },
    'ISO3166-1-Alpha-2': { name: 'ISO3166-1-Alpha-2', index: -1 },
    'ISO4217-currency_alphabetic_code': { name: 'ISO4217-currency_alphabetic_code', index: -1 },
  }

  let isHeader = false

  for await (const line of countriesReader) {
    const cols: string[] = line.toString().split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/)

    if (!isHeader) {
      isHeader = true
      cols.forEach((col: string, index: number) => {
        if (Object.keys(interestedHeaders).indexOf(col) > -1) {
          interestedHeaders[col].index = index
        }
      })
    } else {
      const iso_code = cols[interestedHeaders['ISO3166-1-Alpha-2'].index]
      const dial = cols[interestedHeaders.Dial.index]
      const currency_code = cols[interestedHeaders['ISO4217-currency_alphabetic_code'].index]
      console.log({ currency_code })
      if (iso_code) {
        countries[iso_code] = {
          iso_code,
          dial,
          currency_code,
        }
      }
    }
  }

  countriesReader.close()
}

const formatTimeZones = async () => {
  const rd = readline.createInterface({
    input: fs.createReadStream(path.resolve('data/zone.tab')),
  })
  for await (const line of rd) {
    const l = line.toString().split('\t')
    const countryCode = l[0]
    if (countryCode?.length === 2) {
      timezones[l[2]] = {
        code: l[0].toString(),
        timezone: l[2].toString(),
        ...(countries[countryCode] && {
          dial: `+${countries[countryCode].dial.replace(/[^0-9]/g, '')}`,
          currency_code: countries[countryCode].currency_code,
        }),
      }
    }
  }
  output.write(JSON.stringify(timezones))
  rd.close()
}
const main = async () => {
  await formatCountries()
  await formatTimeZones()
}

main()
