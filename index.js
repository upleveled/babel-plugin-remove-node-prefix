/**
 *
 * @param babel {import('@babel/core')}
*/
module.exports = function removeNodePrefix(babel) {
  return {
    name: 'remove-node-prefix',
    visitor: {
      /**
       * @param path {import('@babel/traverse').NodePath<import('@babel/types').StringLiteral>}
      */
      StringLiteral(path) {
        if (
          (path.parent.type === 'ImportDeclaration' ||
          (path.parent.type === 'CallExpression' &&
            path.parent.callee.name === 'require')) &&
            path.node.value.startsWith('node:')
        ) {
          // remove node: prefix from the path
          path.replaceWith(
            babel.types.stringLiteral(path.node.value.slice(5)),
          );
        }
      },
    },
  };
};
