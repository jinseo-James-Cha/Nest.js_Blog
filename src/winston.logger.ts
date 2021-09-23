import * as winston from 'winston';
import * as dotenv from 'dotenv';
import SlackHook, * as slackWebHook from 'winston-slack-webhook-transport';
const { combine, timestamp, printf } = winston.format;

dotenv.config();

const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

export const winstonLogger = winston.createLogger({
  level: 'info',
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    logFormat,
  ),
  transports: [
    //info
    new winston.transports.File({
      level: 'info',
      handleExceptions: true,
      maxsize: 5242880,
      maxFiles: 7,
      filename: './logs/combined.log',
    }),
  ],
});

export const boardLogger = winston.createLogger({
  level: 'info',
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    logFormat,
  ),
  transports: [
    //info
    new winston.transports.File({
      level: 'info',
      handleExceptions: true,
      maxsize: 5242880,
      maxFiles: 7,
      filename: './logs/board.info.log',
    }),

    // add slack hook
    new SlackHook({
      webhookUrl: 'https://the-testwebhook.slack.com/archives/C02FKJ2S5DJ',
    }),
  ],
});

// process.env.NODE_ENV is undefined as a default
if (process.env.NODE_ENV === 'dev') {
  winstonLogger.add(
    new winston.transports.Console({
      format: combine(winston.format.colorize(), winston.format.simple()),
    }),
  );
}
