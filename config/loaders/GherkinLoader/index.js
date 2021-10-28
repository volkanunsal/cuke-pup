const Transformer = require('./transformer');

module.exports = function loader(source) {
  const transformer = new Transformer();
  return JSON.stringify(transformer.transform(source));
};
