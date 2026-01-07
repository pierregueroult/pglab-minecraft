import { FastifyInstance } from "fastify";
import { rconService } from "../services/rcon.js";
import { config } from "../config.js";

interface ExecuteBody {
  command: string;
}

export async function privateRoutes(fastify: FastifyInstance) {
  fastify.post<{ Body: ExecuteBody }>(
    "/execute",
    {
      preHandler: async (request, reply) => {
        if (!config.auth.enabled) return;

        const apiKey = request.headers["x-api-key"];

        if (apiKey !== config.auth.apiKey) {
          reply.code(401).send({ error: "Unauthorized" });
        }
      },
    },
    async (request, reply) => {
      const { command } = request.body;
      if (!command) {
        return reply.code(400).send({ error: "Command is required" });
      }

      const response = await rconService.send(command);
      return { command, response };
    },
  );
}
