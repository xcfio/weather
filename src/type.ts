import { Type } from "@sinclair/typebox"

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

export type OpenWeatherData = Success //| Error
type code = 200 | 401 | 404 | 429 | 500 | 502 | 503 | 504

type Error = {
    cod: Exclude<code, 200>
    message: string
}

type Success = {
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
