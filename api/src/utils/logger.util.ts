import * as path from 'path';
import * as fs from 'fs';
import { createLogger, format, level, transports } from 'winston';

// Declare the folder to output logs
const LOG_DIRECTORY = 'logs';
const NODE_ENV = process.env.NODE_ENV;

// Create a new log directory if it doesn't exist already
if (!fs.existsSync(LOG_DIRECTORY)) {
  fs.mkdirSync(LOG_DIRECTORY);
}

// Create 3 different logs within the logs folder
const errorLogs = path.join(LOG_DIRECTORY, 'errors.log');
const exceptionLogs = path.join(LOG_DIRECTORY, 'exceptions.log');
const combinedLogs = path.join(LOG_DIRECTORY, 'combined.log');

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new transports.File({ filename: errorLogs, level: 'error' }),
    new transports.File({ filename: combinedLogs }),
  ],
  exceptionHandlers: [new transports.File({ filename: exceptionLogs })],
});

// Make the logs human readable and colorized on development and testing servers
if (NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.printf(
          (info) => `${info.timestamp} ${info.level}: ${info.message}`
        )
      ),
      level: 'debug',
    })
  );
}

export default logger;
