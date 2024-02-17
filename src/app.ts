import apiRouter from './api/api.router';
import * as fs from "fs";
import * as https from "https";

import dotenv from 'dotenv';
const { error: envError } = dotenv.config({
    path: `.env.${process.env.NODE_ENV}`,
});
if (envError) throw envError;
import express from 'express';
import * as http from 'http';
import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import cors from 'cors';
import helmet from 'helmet';

/**
 * Config
 */
const app = express()
    .use(express.json())
    .use(cors())
    .use(helmet())
    .use(expressWinston.logger({
        level: process.env.NODE_ENV === 'dev' ? 'debug' : 'info',
        transports: [new winston.transports.Console()],
        format: winston.format.combine(
            winston.format.json(),
            winston.format.prettyPrint(),
            winston.format.colorize({ all: true })
        ),
        meta: false,
    }));

/**
 * Routing
 */
app.use('/', apiRouter);
app.get('/*', (_: express.Request, res: express.Response) => {
    res.send('API Server');
});

/**
 * Server
 */
const port = 3010;
const httpsPort = 3011;

const server = http.createServer(app);
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

// HTTPS Server
const httpsOptions = {
    key: fs.readFileSync('./certs/key.pem'),
    cert: fs.readFileSync('./certs/cert.pem')
};
const httpsServer = https.createServer(httpsOptions, app);
httpsServer.listen(httpsPort, () => {
    console.log(`HTTPS Server running at https://localhost:${httpsPort}`);
});
