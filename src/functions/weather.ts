import { Coordinates } from "./coordinates"
import { OpenWeatherData } from "../type"

export async function Weather(location: string): Promise<OpenWeatherData> {
    try {
        const { lat, lon } = await Coordinates(location)

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.OPENWEATHER_API_KEY}`
        )

        const data = (await response.json()) as OpenWeatherData

        return {
            location: data.name,
            country: data.sys.country,
            temperature: data.main.temp,
            description: data.weather[0].description,
            feelsLike: data.main.feels_like,
            humidity: data.main.humidity,
            windSpeed: data.wind.speed,
            timestamp: data.dt
        }
    } catch (error) {
        throw new Error(`Failed to fetch weather data: ${(error as Error).message}`)
    }
}
