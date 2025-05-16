import { CoordinatesAPI } from "../type"

export async function coordinates(location: string): Promise<{ lat: number; lon: number } | null> {
    try {
        const query = (await (
            await fetch(
                `http://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(location)}&appid=${
                    process.env.OPENWEATHER_API_KEY
                }`
            )
        ).json()) as CoordinatesAPI

        if (!Array.isArray(query)) throw new Error(query.message)
        if (!query.length) return null

        const { lat, lon } = query[0]
        return { lat, lon }
    } catch (error) {
        throw new Error(`Failed to geocode location: ${(error as Error).message}`)
    }
}
