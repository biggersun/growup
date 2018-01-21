## this 的官方解释(javascript 高级程序语言设计)

this 对象是基于函数的 `执行环境` 绑定的（但是this不是函数的执行环境）: 在全局函数中，this === window，
当函数被作为某个对象的方法调用时，this === 这个对象。
￼￼
### 执行环境(excution context)

执行环境定义了`变量`和`函数`有权访问的其它数据，决定了他们各自的行为。   
执行环境包含`作用域链（scope chain）`，作用域链最后端是全局环境，如果是函数的执行环境那么最前端是函数`执行时`创建的`活动对象（activition object）`（包含 arguments, this,函数）
当函数执行完毕时，函数的活动对象会被销毁。

	ps:作用域链可以理解为只是指向变量对象的指针（引用）列表，而不实际包含变量对象
![point](https://raw.githubusercontent.com/biggersun/growup/master/javaScriptPoint/func.png)
### 闭包
但是`闭包`是其中的一个特例，函数的执行环境会包含外部函数的活动对象，当一个函数内部有一个函数，那么这个内部函数初始化时，执行环境的作用域链里面就包含有其外部函数的活动对象，所以就算外部函数已经执行，但是只要内部函数被返回但是未执行（能被外部访问到，意味着函数必须被返回出去，否则函数永远不会被执行），外部函数的活动对象依旧没有被销毁（但是其执行环境的作用域链会被销毁），直到这个内部函数执行完成。这就是javascript会有闭包特性的原因(作用域链和可以被当做变量的函数两个条件)。

## 总结 this 的用法

构造函数 初始化 属性 --> 涉及到 构造函数、作用域

### this 和 new 的关系
我们来说`new`关键字做了什么，我们都知道`new`是用来创建实例对象的，同过下面这种方式

```javascript
function Constructor(name) {
    this.name = name;
    this.sayHi = () => {
        alert('hi');
    };
}
const obj = new Constructor('obj')
```
new 其实做了下面这些事    
1. 创建一个新的对象    
2. 将构造函数的执行环境和新的对象绑定    
3. 执行函数体    
4. 返回新的对象

翻译成代码可以这样理解

```javasript
function Constructor(name) {
	const obj = new Object();
	obj.name = name;
	obj.sayHi = () => {
		alert('hi')
	};
	
	return obj;
}
```
前面我们说到,`this`是基于执行环境绑定的，上面的第二步实际上就是将函数`this`指向新对象，这就是`this`和`new`的关系

### this 和call(apply)的关系
### this 和箭头函数的关系


