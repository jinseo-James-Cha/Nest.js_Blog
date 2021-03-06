import * as winston from 'winston';
import * as SlackHooks from 'winston-slack-webhook-transport'; // nestjs way
import SlackHook = require('winston-slack-webhook-transport'); // express way

const { combine, timestamp, printf } = winston.format;

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
      maxsize: 5242880, // 5MB
      maxFiles: 7,
      filename: './logs/combined.log',
    }),
    //warning
    new winston.transports.File({
      level: 'warn',
      handleExceptions: true,
      maxsize: 5242880,
      maxFiles: 7,
      filename: './logs/warning.log',
    }),
    // slack webhook
    new SlackHooks({
      webhookUrl:
        'https://hooks.slack.com/services/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',
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
  ],
});

export const hookLogger = winston.createLogger({
  level: 'info',
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    logFormat,
  ),
  transports: [
    // add slack hook
    new SlackHooks({
      webhookUrl:
        'https://hooks.slack.com/services/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',
    }),
  ],
});

// option usage
// process.env.NODE_ENV is undefined as a default
if (process.env.NODE_ENV === 'dev') {
  winstonLogger.add(
    new winston.transports.Console({
      format: combine(winston.format.colorize(), winston.format.simple()),
    }),
  );
}
