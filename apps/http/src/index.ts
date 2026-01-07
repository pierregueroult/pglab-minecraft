import Fastify from 'fastify';
import { config } from './config.js';
import { publicRoutes } from './routes/public.js';
import { privateRoutes } from './routes/private.js';
import { fileRoutes } from './routes/files.js';

const fastify = Fastify({
    logger: true
});

fastify.register(publicRoutes);
fastify.register(privateRoutes);
fastify.register(fileRoutes);

const start = async () => {
    try {
        await fastify.listen({ port: config.port, host: config.host });
        console.log(`Server listening on ${config.host}:${config.port}`);
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

start();
