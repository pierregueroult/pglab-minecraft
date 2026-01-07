import { FastifyInstance } from "fastify";
import path from "path";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const RESOURCES_DIR = path.resolve(__dirname, "../../resources");
const RP_PATH = path.resolve(RESOURCES_DIR, "smpdotdev-rp.zip");
const MRPACK_PATH = path.resolve(RESOURCES_DIR, "smpdotdev-mp.mrpack");

export async function fileRoutes(fastify: FastifyInstance) {
  fastify.get("/resource-pack", async (_, reply) => {
    const zipBuffer = readFileSync(RP_PATH);
    reply.type("application/zip");
    reply.header(
      "Content-Disposition",
      'attachment; filename="smpdotdev-rp.zip"',
    );
    reply.header("Content-Length", zipBuffer.length);

    return reply.send(zipBuffer);
  });

  fastify.get("/mod-pack", async (_, reply) => {
    const mrpackBuffer = readFileSync(MRPACK_PATH);
    reply.type("application/octet-stream");
    reply.header(
      "Content-Disposition",
      'attachment; filename="smpdotdev-mp.mrpack"',
    );
    reply.header("Content-Length", mrpackBuffer.length);

    return reply.send(mrpackBuffer);
  });
}
