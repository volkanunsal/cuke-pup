import fs from 'fs';
import path from 'path';
import Transformer from './transformer';

describe('Transformer', () => {
  it('should transform the feature', () => {
    const transformer = new Transformer();
    const file = path.join(__dirname, 'integration.feature');
    const s = fs.readFileSync(file, 'utf8');
    const result = transformer.transform(s);
    expect(result).toMatchSnapshot();
  });
});
