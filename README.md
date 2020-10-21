# timexone

A small library to get user timezone info through Intl api in the browser

````
import { getTimeZone } from 'timexone'

// returns { code: 'GB', timezone: 'Europe/London', dial: '+44' }
const { code, timezone, dial } = await getTimeZone()


````