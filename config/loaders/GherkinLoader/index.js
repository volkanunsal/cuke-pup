import Transformer from './transformer';

export default function loader(source) {
  const transformer = new Transformer();
  return JSON.stringify(transformer.transform(source));
}
