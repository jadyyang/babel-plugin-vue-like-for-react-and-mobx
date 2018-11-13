const _ = require('lodash');


function isValue(value) {
  const type = typeof value;
  return type === 'number' || type === 'string' || type === 'boolean';
}

exports.getVModelValue = function getVModelValue(scope, key) {
  return _.get(scope, key);
};

exports.handleSetVModelEvent = function handleSetVModelEvent(scope, key, event) {
  let value = null;

  switch (typeof event) {
    case 'boolean':
    case 'number':
    case 'string':
      value = event;
      break;
    case 'object':
      if (event === null) {
        console.error(`没有从event中解析到有效的值 v-model="${key}" event==null`);
        return;
      }
      if (event.target) {
        value = event.target.value;
      } else {
        if (!isValue(event.value)) {
          console.error(`没有从event中解析到有效的值 v-model="${key}"`);
          return;
        }
        value = event.value;
      }
      break;
    default:
      console.error(`没有从event中解析到有效的值 v-model="${key}"`);
      return;
  }

  return _.set(scope, key, value);
};
