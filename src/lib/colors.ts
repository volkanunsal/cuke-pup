/**
 * @fileoverview This file contains helpers to change the color of log outputs
 * in the Node console.
 *
 * @example
 * import { colors } from './colors';
 *
 * console.log(colors.red('hello world'))
 * // => \x1b[31mHello world\x1b[0m
 *
 */
const Reset = '\x1b[0m';

export enum Style {
  Bright = '\x1b[1m',
  Bold = '\x1b[1m',
  Dim = '\x1b[2m',
  Underscore = '\x1b[4m',
  Blink = '\x1b[5m',
  Reverse = '\x1b[7m',
  Hidden = '\x1b[8m',
  Black = '\x1b[30m',
  Red = '\x1b[31m',
  Green = '\x1b[32m',
  Yellow = '\x1b[33m',
  Blue = '\x1b[34m',
  Magenta = '\x1b[35m',
  Cyan = '\x1b[36m',
  White = '\x1b[37m',
  BgBlack = '\x1b[40m',
  BgRed = '\x1b[41m',
  BgGreen = '\x1b[42m',
  BgYellow = '\x1b[43m',
  BgBlue = '\x1b[44m',
  BgMagenta = '\x1b[45m',
  BgCyan = '\x1b[46m',
  BgWhite = '\x1b[47m',
}

interface StylesAPI {
  bright(str: string): string;
  bold(str: string): string;
  dim(str: string): string;
  underscore(str: string): string;
  blink(str: string): string;
  reverse(str: string): string;
  hidden(str: string): string;
  black(str: string): string;
  red(str: string): string;
  green(str: string): string;
  yellow(str: string): string;
  blue(str: string): string;
  magenta(str: string): string;
  cyan(str: string): string;
  white(str: string): string;
  bgBlack(str: string): string;
  bgRed(str: string): string;
  bgGreen(str: string): string;
  bgYellow(str: string): string;
  bgBlue(str: string): string;
  bgMagenta(str: string): string;
  bgCyan(str: string): string;
  bgWhite(str: string): string;
}

export const colors: StylesAPI = {} as any;

for (const entry of Object.entries(Style)) {
  const method = entry[0].replace(/^[a-z]|[A-Z]/g, (v, i) =>
    i === 0 ? v.toLowerCase() : '' + v.toUpperCase(),
  );
  colors[method] = (str: string) => `${entry[1]}${str}${Reset}`;
}
