import { axios } from 'hooks/worker'

const WEATHER_BASE_URL = 'https://api.openweathermap.org/data/2.5'

interface Params {
  lat: number
  lon: number
}
