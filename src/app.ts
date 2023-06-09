import dotenv from 'dotenv';
import ExpressApplication from './bootstrapper';
import express from 'express';
import logger from './lib/logger';
import 'reflect-metadata';
import cors from 'cors';
import { credentials } from './middleware/credentials';
import { corsOptions } from './config/corsOptions';
import { APIController } from './controller';
// Loading the envs based on current NODE_ENV
dotenv.config({ path: `${process.cwd()}/.env` });

const PORT = process.env.PORT || 5000;

const app = new ExpressApplication(
  PORT,
  [
    cors(corsOptions),
    credentials,
    express.json({ limit: '10kb' }),
    express.urlencoded({ extended: true, limit: '10kb' }),
  ],
  [APIController],
);

const server = app.start();

// Handle SIGTERM
process.on('SIGTERM', () => {
  logger.warn('SIGTERM RECIEVED!');
  server.close(() => {
    logger.warn('Process terminated!');
  });
});
