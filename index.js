export default function removeNodePrefix(babel) {
  return {
    name: "remove-node-prefix",
    visitor: {
      StringLiteral(path) {
        if (
          path.parent.type === "ImportDeclaration" ||
          (path.parent.type === "CallExpression" &&
            path.parent.callee.name === "require")
        ) {
          path.replaceWith(
            babel.types.stringLiteral(path.node.value.replace(/^node:/, ""))
          );
        }
        path.skip();
      },
    },
  };
}
