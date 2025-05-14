import { GeocodingResult } from "../type"

export async function Coordinates(location: string): Promise<GeocodingResult> {
    try {
        const response = (await (
            await fetch(
                `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(location)}&limit=1&appid=${
                    process.env.OPENWEATHER_API_KEY
                }`
            )
        ).json()) as any

        if (response.length === 0) {
            throw new Error("Location not found")
        }

        const { lat, lon } = response
        return { lat, lon }
    } catch (error) {
        throw new Error(`Failed to geocode location: ${(error as Error).message}`)
    }
}
