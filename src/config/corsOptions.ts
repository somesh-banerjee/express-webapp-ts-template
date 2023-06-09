import { allowedOrigins } from './allowedOrigins';
const corsOptions = {
  origin: (origin: string | undefined, callback: any) => {
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
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

export { corsOptions };