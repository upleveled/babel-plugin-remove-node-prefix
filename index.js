/**
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
        const isImportOrRequire =
          path.parent.type === 'ImportDeclaration' ||
          (path.parent.type === 'CallExpression' &&
            path.parent.callee.name === 'require');

        if (isImportOrRequire && path.node.value.startsWith('node:')) {
          // Remove `node:` prefix from the path
          path.replaceWith(babel.types.stringLiteral(path.node.value.slice(5)));
        }
      },
    },
  };
};
