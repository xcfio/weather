import { FastifyRequest, FastifyReply } from "fastify"
import { coordinates } from "../functions/coordinates"
import { WeatherAPI } from "../type"

export async function weather(request: FastifyRequest<{ Querystring: { location: string } }>, reply: FastifyReply) {
    try {
        const { location } = request.query
        if (!location) return reply.code(400).send({ error: "Location parameter is required" })

        const { lat, lon } = (await coordinates(location)) ?? {}
        if (!lat || !lon) return reply.code(404).send({ error: "Location not found" })

        const query = (await (
            await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.OPENWEATHER_API_KEY}`
            )
        ).json()) as WeatherAPI

        query.cod = parseInt((query.cod as number | string).toString()) as WeatherAPI["cod"]
        if (query.cod !== 200) return reply.code(Number(query.cod ?? 500)).send({ error: query.message })

        return {
            location: query.name,
            country: query.sys.country,
            temperature: query.main.temp,
            description: query.weather[0].description,
            feelsLike: query.main.feels_like,
            humidity: query.main.humidity,
            windSpeed: query.wind.speed,
            timestamp: query.dt
        }
    } catch (error) {
        request.log.error(error)
        return reply.code(500).send({ error: (error as Error).message })
    }
}
