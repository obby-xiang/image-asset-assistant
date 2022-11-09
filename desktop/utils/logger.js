const { app } = require('electron');
const path = require('path');
const winston = require('winston');
const { stringify } = require('./index');

module.exports = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.splat(),
    winston.format.timestamp({ format: 'YYYY-MM-dd HH:mm:ss.SSS' })
  ),
  transports: [
    new winston.transports.File({
      filename: path.resolve(app.getPath('userData'), './app.log'),
      format: winston.format.combine(winston.format.json()),
    }),
    ...(app.isPackaged
      ? []
      : [
          new winston.transports.Console({
            format: winston.format.combine(
              winston.format.align(),
              winston.format.colorize({ all: true }),
              winston.format.printf(
                ({ level, message, timestamp }) =>
                  `${timestamp} ${level} ${stringify(message)}`
              )
            ),
          }),
        ]),
  ],
});
