import { FastifyRequest, FastifyReply } from "fastify"
import { coordinates } from "../functions/coordinates"
import { Forecast } from "../type"

export async function forecast(request: FastifyRequest<{ Querystring: { location: string } }>, reply: FastifyReply) {
    try {
        const { location } = request.query

        if (!location) {
            return reply.code(400).send({ error: "Location parameter is required" })
        }

        const { lat, lon } = await coordinates(location)

        const query = (await (
            await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${process.env.OPENWEATHER_API_KEY}`
            )
        ).json()) as Forecast

        if (query.cod != 200) {
            return reply.code(Number(query.cod)).send({ error: query.message })
        }

        const forecastItems = query.list.map((item: any) => ({
            time: new Date(item.dt * 1000).toISOString(),
            temperature: item.main.temp,
            description: item.weather[0].description,
            humidity: item.main.humidity,
            windSpeed: item.wind.speed
        }))

        return {
            location: query.city.name,
            country: query.city.country,
            forecast: forecastItems
        }
    } catch (error) {
        request.log.error(error)
        return reply.code(500).send({ error: (error as Error).message })
    }
}
