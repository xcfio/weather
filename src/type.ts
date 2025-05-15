import { Type } from "@sinclair/typebox"

export const WeatherResponseSchema = Type.Object({
    location: Type.String(),
    country: Type.String(),
    temperature: Type.Number(),
    description: Type.String(),
    feelsLike: Type.Number(),
    humidity: Type.Number(),
    windSpeed: Type.Number(),
    timestamp: Type.Number()
})

export const ForecastResponseSchema = Type.Object({
    location: Type.String(),
    country: Type.String(),
    forecast: Type.Array(
        Type.Object({
            time: Type.String(),
            temperature: Type.Number(),
            description: Type.String(),
            humidity: Type.Number(),
            windSpeed: Type.Number()
        })
    )
})

export const ErrorResponseSchema = Type.Object({
    error: Type.String()
})

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            OPENWEATHER_API_KEY: string
        }
    }
}

export type WeatherData = {
    location: string
    temperature: number
    description: string
    feelsLike: number
    humidity: number
    windSpeed: number
    country: string
    timestamp: number
}

export type ForecastData = {
    location: string
    country: string
    forecast: Array<{
        date: string
        temperature: number
        description: string
        humidity: number
        windSpeed: number
    }>
}

export type GeocodingResult = {
    lat: number
    lon: number
}

export type OpenWeatherData =
    | {
          coord: {
              lon: number
              lat: number
          }
          weather: Array<{
              id: number
              main: string
              description: string
              icon: string
          }>
          base: string
          main: {
              temp: number
              feels_like: number
              temp_min: number
              temp_max: number
              pressure: number
              humidity: number
          }
          visibility: number
          wind: {
              speed: number
              deg: number
              gust: number
          }
          clouds: {
              all: number
          }
          dt: number
          sys: {
              type: number
              id: number
              country: string
              sunrise: number
              sunset: number
          }
          timezone: number
          id: number
          name: string
          cod: 200
      }
    | {
          cod: string | number
          message: string
      }

export type Coordinates = {
    name: string
    local_names: LocalNames
    lat: number
    lon: number
    country: string
    state: string
}

export type LocalNames = {
    et: string
    fa: string
    ar: string
    ja: string
    fr: string
    ur: string
    kn: string
    ru: string
    hi: string
    de: string
    uk: string
    es: string
    bn: string
    en: string
}

export type Forecast = {
    cod: 200
    message: number
    cnt: number
    list: List[]
    city: City
}
// | {
//       cod: string | number
//       message: string
//   }

export type City = {
    id: number
    name: string
    coord: Coord
    country: string
    population: number
    timezone: number
    sunrise: number
    sunset: number
}

export type Coord = {
    lat: number
    lon: number
}

export type List = {
    dt: number
    main: MainClass
    weather: Weather[]
    clouds: Clouds
    wind: Wind
    visibility?: number
    pop: number
    sys: Sys
    dt_txt: Date
    rain?: Record<string, number>
}

export type Clouds = {
    all: number
}

export type MainClass = {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    sea_level: number
    grnd_level: number
    humidity: number
    temp_kf: number
}

export type Sys = {
    pod: Pod
}

export enum Pod {
    D = "d",
    N = "n"
}

export type Weather = {
    id: number
    main: MainEnum
    description: string
    icon: string
}

export enum MainEnum {
    Clear = "Clear",
    Clouds = "Clouds",
    Rain = "Rain"
}

export type Wind = {
    speed: number
    deg: number
    gust: number
}
