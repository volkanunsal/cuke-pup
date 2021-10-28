import { cucumber } from 'stucumber';
import compiler from './compiler.js';

test('Inserts name and outputs JavaScript', async () => {
  const stats = await compiler('integration.feature');
  const output = stats.toJson({ source: true }).modules[0].source;
  eval(output.toString());

  expect(cucumber.getResults()).toMatchSnapshot();
});
