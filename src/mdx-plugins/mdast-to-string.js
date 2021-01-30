// modified from https://github.com/syntax-tree/mdast-util-to-string/blob/main/index.js

const katex = require('katex');

module.exports = toString;

// Get the text content of a node.
// Prefer the node’s plain-text fields, otherwise serialize its children,
// and if the given value is an array, serialize the nodes in it.
function toString(node) {
  if (node && node.type === 'inlineMath') {
    return katex.renderToString(node.value);
  }
  return (
    (node &&
      (node.value ||
        node.alt ||
        node.title ||
        ('children' in node && all(node.children)) ||
        ('length' in node && all(node)))) ||
    ''
  );
}

function all(values) {
  var result = [];
  var index = -1;

  while (++index < values.length) {
    result[index] = toString(values[index]);
  }

  return result.join('');
}
