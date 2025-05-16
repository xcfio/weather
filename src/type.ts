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

export type WeatherAPI = SuccessWeather | Error
export type ForecastAPI = SuccessForecast | Error
export type CoordinatesAPI = Array<SuccessCoordinates> | Error

type code = 200 | 401 | 404 | 429 | 500 | 502 | 503 | 504
type Error = {
    cod: Exclude<code, 200>
    message: string
}

type SuccessWeather = {
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
    cod: Extract<code, 200>
}

type SuccessCoordinates = {
    name: string
    local_names?: {
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
    lat: number
    lon: number
    country: string
    state: string
}

export type SuccessForecast = {
    cod: Extract<code, 200>
    message: number
    cnt: number
    list: Array<{
        dt: number
        main: {
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
        weather: Array<{
            id: number
            main: "Clear" | "Clouds" | "Rain"
            description: string
            icon: string
        }>
        clouds: {
            all: number
        }
        wind: {
            speed: number
            deg: number
            gust: number
        }
        visibility?: number
        pop: 0 | 1
        sys: {
            pod: "d" | "n"
        }
        dt_txt: string
        rain?: {
            "3h": number
        }
        snow?: {
            "3h": number
        }
    }>
    city: {
        id: number
        name: string
        coord: {
            lat: number
            lon: number
        }
        country: string
        population: number
        timezone: number
        sunrise: number
        sunset: number
    }
}
