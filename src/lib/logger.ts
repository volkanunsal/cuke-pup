import Logger0 from 'js-logger';

const opts = {
  name: 'Canvas',
  defaultLevel: Logger0.DEBUG,
};
Logger0.useDefaults(opts);

export const Logger = Logger0;

export const setLevel = (
  level: 'TRACE' | 'DEBUG' | 'INFO' | 'TIME' | 'WARN' | 'ERROR' | 'OFF',
) => {
  Logger.setLevel(Logger[level]);
};

export const turnOff = () => {
  setLevel('OFF');
};

export const turnOn = () => {
  setLevel('INFO');
};
export default Logger;
