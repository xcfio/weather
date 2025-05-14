import { ErrorResponseSchema, ForecastResponseSchema, WeatherResponseSchema } from "./type"
import { forecast } from "./routes/forecast"
import { weather } from "./routes/weather"
import { Type } from "@sinclair/typebox"
import Router from "fastify"

const fastify = Router()

fastify.get("/", (_, reply) => reply.redirect("https://github.com/xcfio/weather#readme"))
fastify.get("/status", async (_, reply) => reply.code(200).send({ status: "ok" }))

fastify.route({
    method: "GET",
    url: "/api/weather",
    schema: {
        querystring: Type.Object({
            location: Type.String()
        }),
        response: {
            200: WeatherResponseSchema,
            400: ErrorResponseSchema,
            500: ErrorResponseSchema
        }
    },
    handler: weather
})

fastify.route({
    method: "GET",
    url: "/api/forecast",
    schema: {
        querystring: Type.Object({
            location: Type.String()
        }),
        response: {
            200: ForecastResponseSchema,
            400: ErrorResponseSchema,
            500: ErrorResponseSchema
        }
    },
    handler: forecast
})

export default fastify
