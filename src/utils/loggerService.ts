import Logger from "js-logger"

const loggerName = "ICD-EINV";

// Display inside window
// eslint-disable-next-line
Logger.useDefaults();

export const logger = Logger.get(loggerName);

const envLevel = process.env.REACT_APP_LOG_LEVEL || 'ERROR';

const validLevels = ["TRACE", "DEBUG", "INFO", "TIME", "WARN", "ERROR", "OFF"];
const logLevels = [Logger.TRACE, Logger.DEBUG, Logger.INFO, Logger.TIME, Logger.WARN, Logger.ERROR, Logger.OFF];

const index = validLevels.indexOf(envLevel);
const levelIndex = index < 0 ? 5 : index;

logger.setLevel(logLevels[levelIndex]);
logger.debug(`Niveau de log actuel: ${validLevels[levelIndex]}`);

/**
 * Logger service
 */
export function useLogger() {
  return { logger };
}
