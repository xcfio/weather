import { FastifyRequest, FastifyReply } from "fastify"
import { Forecast } from "../functions/forecast"

export async function forecast(request: FastifyRequest<{ Querystring: { location: string } }>, reply: FastifyReply) {
    try {
        const { location } = request.query

        if (!location) {
            return reply.code(400).send({ error: "Location parameter is required" })
        }

        const forecastData = await Forecast(location)
        return reply.code(200).send(forecastData)
    } catch (error) {
        request.log.error(error)
        return reply.code(500).send({ error: (error as Error).message })
    }
}
