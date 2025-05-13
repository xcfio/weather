import Router from "fastify"

const fastify = Router()

fastify.get("/", () => "Success")

export default fastify

