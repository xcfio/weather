import { ErrorResponseSchema, ForecastResponseSchema, WeatherResponseSchema } from "./type"
import { forecast } from "./routes/forecast"
import { weather } from "./routes/weather"
import { Type } from "@sinclair/typebox"
import cors from "@fastify/cors"
import Router from "fastify"

const fastify = Router()
fastify.register(cors, { origin: "*", methods: ["GET"] })

fastify.get("/", (_, reply) => reply.redirect("https://github.com/xcfio/weather#readme"))
fastify.get("/status", (_, reply) => reply.code(200).send({ status: "ok" }))

fastify.route({
    method: "GET",
    url: "/api/weather",
    schema: {
        querystring: Type.Object({
            location: Type.String()
        }),
        response: {
            200: ForecastResponseSchema,
            "4xx": ErrorResponseSchema,
            "5xx": ErrorResponseSchema
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
            "4xx": ErrorResponseSchema,
            "5xx": ErrorResponseSchema
        }
    },
    handler: forecast
})

export default fastify
