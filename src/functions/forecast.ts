import { coordinates } from "./coordinates"
import { ForecastData } from "../type"

export async function Forecast(location: string): Promise<ForecastData> {
    try {
        const { lat, lon } = await coordinates(location)

        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.OPENWEATHER_API_KEY}`
        )

        const data = (await response.json()) as any
        const forecastItems = data.list
            // Get one forecast per day (at noon)
            .filter((_: any, index: number) => index % 8 === 0)
            .slice(0, 5)
            .map((item: any) => ({
                date: new Date(item.dt * 1000).toISOString().split("T")[0],
                temperature: item.main.temp,
                description: item.weather[0].description,
                humidity: item.main.humidity,
                windSpeed: item.wind.speed
            }))

        return {
            location: data.city.name,
            country: data.city.country,
            forecast: forecastItems
        }
    } catch (error) {
        throw new Error(`Failed to fetch forecast data: ${(error as Error).message}`)
    }
}
