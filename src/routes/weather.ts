import { FastifyRequest, FastifyReply } from "fastify"
import { coordinates } from "../functions/coordinates"
import { OpenWeatherData } from "../type"

export async function weather(request: FastifyRequest<{ Querystring: { location: string } }>, reply: FastifyReply) {
    try {
        const { location } = request.query

        if (!location) {
            return reply.code(400).send({ error: "Location parameter is required" })
        }

        const { lat, lon } = await coordinates(location)

        const query = (await (
            await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.OPENWEATHER_API_KEY}`
            )
        ).json()) as OpenWeatherData
        query.cod = parseInt((query.cod as number | string).toString()) as any

        console.log(lat, lon)
        console.log(query)

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
