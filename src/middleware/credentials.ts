import { allowedOrigins } from '../config/allowedOrigins';
import { Request, Response } from 'express';
import logger from '../lib/logger';

const credentials = (req: any, res: any, next: any) => {
  const origin = req.headers.origin;
  logger.info('Origin: ' + origin);
  if (
    !origin ||
    allowedOrigins.some((item) => {
      if (typeof item === 'string') {
        return item === origin;
      } else {
        return item.test(origin);
      }
    })
  ) {
    res.header('Access-Control-Allow-Credentials', true);
  }
  next();
};

export { credentials };
