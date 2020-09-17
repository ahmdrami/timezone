import fs from 'fs'
import readline from 'readline'
import path from 'path'
import { TimeXones } from '../src/timexone.models'

const output = fs.createWriteStream('src/zones.json')

const rd = readline.createInterface({
  input: fs.createReadStream(path.resolve('data/zone.tab')),
})

const data: TimeXones = {}

rd.on('line', (line) => {
  const l = line.toString().split('\t')

  if (l[0]?.length === 2) {
    data[l[2]] = { code: l[0].toString(), timezone: l[2].toString() }
  }
})

rd.on('close', () => {
  output.write(JSON.stringify(data))
})
