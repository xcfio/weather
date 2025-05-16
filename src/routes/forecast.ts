import { FastifyRequest, FastifyReply } from "fastify"
import { coordinates } from "../functions/coordinates"
import { ForecastAPI } from "../type"

export async function forecast(request: FastifyRequest<{ Querystring: { location: string } }>, reply: FastifyReply) {
    try {
        const { location } = request.query
        if (!location) return reply.code(400).send({ error: "Location parameter is required" })

        const { lat, lon } = (await coordinates(location)) ?? {}
        if (!lat || !lon) return reply.code(404).send({ error: "Location not found" })

        const query = (await (
            await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.OPENWEATHER_API_KEY}`
            )
        ).json()) as ForecastAPI

        query.cod = parseInt((query.cod as number | string).toString()) as ForecastAPI["cod"]
        if (query.cod !== 200) return reply.code(Number(query.cod ?? 500)).send({ error: query.message })

        return {
            location: query.city.name,
            country: query.city.country,
            forecast: query.list.map((item) => ({
                time: new Date(item.dt * 1000).toISOString(),
                temperature: item.main.temp,
                description: item.weather[0].description,
                humidity: item.main.humidity,
                windSpeed: item.wind.speed
            }))
        }
    } catch (error) {
        request.log.error(error)
        return reply.code(500).send({ error: (error as Error).message })
    }
}
