const Transformer = require('./transformer');

module.exports = function loader(source) {
  const transformer = new Transformer();
  const res = transformer.transform(source);
  return res;
};
