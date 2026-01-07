import { Rcon } from 'rcon-client';
import { config } from '../config.js';

class RconService {
    private rcon: Rcon | null = null;
    private isConnecting = false;

    async connect() {
        if (this.rcon || this.isConnecting) return;
        this.isConnecting = true;

        try {
            this.rcon = new Rcon({
                host: config.rcon.host,
                port: config.rcon.port,
                password: config.rcon.password,
                timeout: config.rcon.timeout,
            });

            this.rcon.on('error', (err) => {
                console.error('RCON Error:', err);
                this.rcon = null;
            });

            this.rcon.on('end', () => {
                console.log('RCON Connection closed');
                this.rcon = null;
            });

            await this.rcon.connect();
            console.log('Connected to RCON');
        } catch (error) {
            console.error('Failed to connect to RCON:', error);
            this.rcon = null;
            throw error;
        } finally {
            this.isConnecting = false;
        }
    }

    async send(command: string): Promise<string> {
        if (!this.rcon) {
            try {
                await this.connect();
            } catch (e) {
                return 'Error: Could not connect to RCON';
            }
        }

        try {
            if (!this.rcon) throw new Error("RCON not connected");
            return await this.rcon.send(command);
        } catch (error) {
            console.error('Error sending command:', error);
            return 'Error: Could not send command';
        }
    }

    async disconnect() {
        if (this.rcon) {
            await this.rcon.end();
            this.rcon = null;
        }
    }
}

export const rconService = new RconService();
