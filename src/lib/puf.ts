/**
 * @fileoverview puf is a wrapper around js-logger. Its purpose is to capture the log outputs.
 *
 */
import Logger0 from 'js-logger';

const opts = {
  name: 'Canvas',
  defaultLevel: Logger0.DEBUG,
};
Logger0.useDefaults(opts);

// Main entry point of the logger.
export const puf = Logger0;

/**
 * setLevel sets the level of the logger.
 *
 * @category Internal
 */
export const setLevel = (
  level: 'TRACE' | 'DEBUG' | 'INFO' | 'TIME' | 'WARN' | 'ERROR' | 'OFF',
) => {
  puf.setLevel(puf[level]);
};

/**
 * turnOff turns off the logger.
 *
 * @category Internal
 */
export function turnOff() {
  setLevel('OFF');
}

/**
 * turnOn turns on the logger.
 *
 * @category Internal
 */
export function turnOn() {
  setLevel('INFO');
}
