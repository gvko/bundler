import pino from 'pino';

const loggerConfig = {
  level: process.env.LOG_LEVEL || 'info',
  formatters: {
    level: (label: string) => {
      return { level: label };
    },
  },
  stream: process.stdout,
  transport: {
    target: 'pino-pretty',
  },
};

export const logger = pino(loggerConfig);
export type Logger = pino.Logger;
