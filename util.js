const bt = require('babel-types');


// 判断一个节点是不是 React.Component 的子类
exports.isSubClassOfReactComponent = function isSubClassOfReactComponent(classNode) {
  if (classNode.body && Array.isArray(classNode.body.body) && classNode.body.body.length > 0) {
    return classNode.body.body.findIndex((node) => {
      if (node.type === 'ClassMethod' && node.key && node.key.name === 'render') {
        return true;
      }
      return false;
    }) !== -1;
  }
  return false;
};

// 增加属性：  value={getVModelValue(this, "a.b.c")}
exports.addVModelValueAttr = function addVModelValueAttr(elementPath, vModelPropValue) {
  elementPath.pushContainer(
    'attributes',
    bt.jSXAttribute(
      bt.jSXIdentifier('value'),
      bt.jSXExpressionContainer(
        bt.callExpression(
          bt.identifier('getVModelValue'),
          [
            bt.thisExpression(),
            vModelPropValue,
          ],
        ),
      ),
    ),
  );
};

// 增加属性：  onChange={(event) => handleVModelEvent(this, "a.b.c", event)}
exports.addVModelEventAttr = function addVModelEventAttr(elementPath, vModelPropValue) {
  elementPath.pushContainer(
    'attributes',
    bt.jSXAttribute(
      bt.jSXIdentifier('onChange'),
      bt.jSXExpressionContainer(
        bt.arrowFunctionExpression(
          [
            bt.identifier('event'),
          ],
          bt.callExpression(
            bt.identifier('handleSetVModelEvent'),
            [
              bt.thisExpression(),
              vModelPropValue,
              bt.identifier('event'),
            ],
          ),
        ),
      ),
    ),
  );
};

exports.addImportVModel = function addImportVModel(programPath) {
  programPath.unshiftContainer(
    'body',
    bt.importDeclaration(
      [
        bt.importSpecifier(
          bt.identifier('getVModelValue'),
          bt.identifier('getVModelValue'),
        ),
        bt.importSpecifier(
          bt.identifier('handleSetVModelEvent'),
          bt.identifier('handleSetVModelEvent'),
        ),
      ],
      bt.stringLiteral('babel-plugin-vue-like-for-react-and-mobx/vmodel'),
    ),
  );
};
