# babel-plugin-vue-like-for-react-and-mobx

给React增加VUE类似的功能（使用mobx）

## 使用示例

```js
@observer
class MyComponent extends React.Component {

  static propTypes = {
    interest: PropTypes.String,
  };

  @observable
  formData = {
    name: '',
    age: '',
  };

  render() {
    <div>
      <div>Name: <input v-model="formData.name" /></div>
      <div>Age: <input v-model="formData.age" /></div>
      <div>
        Interest:
        <select v-model="props.interest">
          <option>None</option>
          <option value="1">Music</option>
          <option value="2">Movie</option>
        </select>
      </div>
    </div>
  }
}
```

## 原理

`v-model` 其实就是一个语法糖，在编译阶段进行了静态代码转换。如下：

```js
// Before
<Node v-mode="x.y" />

// After
<Node
  value={getVModelValue(this, "x.y")}
  onChange={e => handleSetVModelEvent(this, "x.y", e)}
/>
```

编译后的代码中，用到的两个方法： `getVModelValue` 和 `handleSetVModelEvent` 的实现，可以参考 `vmodel.js`

## 使用方法

1. 安装： `npm i --save babel-plugin-vue-like-for-react-and-mobx`
2. 配置webpack

```js
{
  ...
  module: {
    rules: [
      test: /\.js$/,
      ...
      use: {
        loader: 'babel-loader',
        options: {
          presets: [...],
          plugins: [
            'vue-like-for-react-and-mobx', // 这是关键，最好放在第一个
            ...
          ]
        }
      }
    ]
  }
}
```

## 不足

现在还些不支持或者不好的地方：

1. 调试不够友好：如果转换出的代码出现问题了，现在还跟踪不了执行过程。不过代码比较简单，一般不会出问题。
2. 验证不全：因为v-model会转换生成 `value` 和 `onChange` ，如果原来这个节点上就有这两个属性就会冲突。原则上应该在编译阶段报错，但是现在还没有支持，后续会支持
