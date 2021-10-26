import { colors } from './colors';

describe('colors', () => {
  it('works', () => {
    const tuples = [
      ['bright', '\u001b[1mtest\u001b[0m'],
      ['bold', '\u001b[1mtest\u001b[0m'],
      ['dim', '\u001b[2mtest\u001b[0m'],
      ['underscore', '\u001b[4mtest\u001b[0m'],
      ['blink', '\u001b[5mtest\u001b[0m'],
      ['reverse', '\u001b[7mtest\u001b[0m'],
      ['hidden', '\u001b[8mtest\u001b[0m'],
      ['black', '\u001b[30mtest\u001b[0m'],
      ['red', '\u001b[31mtest\u001b[0m'],
      ['green', '\u001b[32mtest\u001b[0m'],
      ['yellow', '\u001b[33mtest\u001b[0m'],
      ['blue', '\u001b[34mtest\u001b[0m'],
      ['magenta', '\u001b[35mtest\u001b[0m'],
      ['cyan', '\u001b[36mtest\u001b[0m'],
      ['white', '\u001b[37mtest\u001b[0m'],
      ['bgBlack', '\u001b[40mtest\u001b[0m'],
      ['bgRed', '\u001b[41mtest\u001b[0m'],
      ['bgGreen', '\u001b[42mtest\u001b[0m'],
      ['bgYellow', '\u001b[43mtest\u001b[0m'],
      ['bgBlue', '\u001b[44mtest\u001b[0m'],
      ['bgMagenta', '\u001b[45mtest\u001b[0m'],
      ['bgCyan', '\u001b[46mtest\u001b[0m'],
      ['bgWhite', '\u001b[47mtest\u001b[0m'],
    ];

    for (const tuple of tuples) {
      expect(colors[tuple[0]]('test')).toEqual(tuple[1]);
    }
  });
});
