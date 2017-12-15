# TDD 测试驱动开发 (Test-Driven Development) 和 BDD 行为驱动开发 (Behavior Driven Development) 的区别

    两者不是同一个层面东西，
    TDD 指的是测试驱动开发 --> 先写函数级别的单元测试用例，然后再去开发的开发流程。
    BDD 指的是从用户行为角度约束功能实现的测试用例，使得开发出的功能和设计一致。

### 总结下 karma 遇到的坑

    最开始只是希望快速跑起来一个karma + mocha + es6 的demo，使用babel-plugin-transform-es2015-modules-umd来做模块编译，一直不能成功
    报错 import 进来的是undefined，但是神奇的是过了一天之后什么都没动就跑起来了(这个有待再议)。

    当时我想的对策，既然模块编译不成功，我索性就上webpack了，反正之后的正常项目都会是有模块加载工具在前面，所以package.json:

```json
    "devDependencies": {
        "babel": "^6.23.0",
        "babel-core": "^6.26.0",
        "babel-loader": "^7.1.2",
        "babel-preset-env": "^1.6.1",
        "chai": "^4.1.2",
        "karma": "^1.7.1",
        "karma-chai": "^0.1.0",
        "karma-chrome-launcher": "^2.2.0",
        "karma-coverage": "^1.1.1",
        "karma-mocha": "^1.3.0",
        "karma-webpack": "^2.0.8",
        "mocha": "^4.0.1",
        "webpack": "^3.10.0"
    }
```
    简单解释下包的作用
    babel*复制转义到es6
    chai 断言库
    mocha 测试框架
    karma 测试脚手架(我自己的定义)负责自动糊控制整个测试流程
    karma* 是karma连接相关插件需要的包
    webpack 模块打包工具，负责模块化管理优化代码资源

    但是按照配置运行之后，成功，但是发现一个问题是经过webpack打包后运行测试用例的话，coverage会夹杂打包之后的代码数据，使得coverage的数据变得没有意义。

    so 添加两个包来负责做这件事

```json
    "devDependencies": {
        "istanbul-instrumenter-loader": "^3.0.0",
        "karma-coverage-istanbul-reporter": "^1.3.0",
    }
```
    然后大功告成，一切都符合我希望的流程。

    todo
    但是到这还只是单元测试的简单流程，
    实际项目中，还需要做的补充是 webpack 的配置，babel-loader和istanbul-loader的处理
    还有浏览器测试的补充


