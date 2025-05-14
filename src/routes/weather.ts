import { FastifyRequest, FastifyReply } from "fastify"
import { Weather } from "../functions/weather"
import { OpenWeatherData } from "../type"
import { Coordinates } from "../functions/coordinates"

export async function weather(request: FastifyRequest<{ Querystring: { location: string } }>, reply: FastifyReply) {
    try {
        const { location } = request.query

        if (!location) {
            return reply.code(400).send({ error: "Location parameter is required" })
        }

        const { lat, lon } = await Coordinates(location)

        const query = (await (
            await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.OPENWEATHER_API_KEY}`
            )
        ).json()) as OpenWeatherData
        query.cod = parseInt((query.cod as number | string).toString()) as any

        const weatherData = await Weather(location)
        return reply.code(200).send(weatherData)
    } catch (error) {
        request.log.error(error)
        return reply.code(500).send({ error: (error as Error).message })
    }
}
