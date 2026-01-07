import { FastifyInstance } from "fastify";

export async function publicRoutes(fastify: FastifyInstance) {
  fastify.get("/health", async () => {
    return { status: "ok" };
  });
}
