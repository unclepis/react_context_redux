# 使用redux和context上下文管理组件通信

## 思路梳理
在学习react的这段时间，一直看官方文档和各种学习资料在说，react实际上只是提供了一个MVC结构中的view层解决方案，也就是说它是视图层的一个库，在自我学习的过程中也遇到了一个一个问题，这些问题随着学习的深入也慢慢迎刃而解

### 问题1：为什么引入redux？
引用阮一峰老师的一句话：当你不知道你的项目需要不需要redux的时候，事实上，你的工程是不需要redux的，为什么呢？因为你的项目中组件的交互还没有复杂到你每写一个组件，都需要通过使用状态提升的方式来进行state的共享。事实上，说到redux，我们无非关注的就是数据共享和组件之间通信的问题，而react.js除了状态提升以外并没有更好的办法帮我们解决组件之间共享状态的问题。有人的可能会说可以通过context进行数据共享啊？确实可以，context是类似一个声明在全局的变量，一旦在父组件中定义了context那么其下的子组件都可以随意修改和共享context的数据，而使用context的问题也就显而易见了，都可以修改，那么对于维护和调试来说肯定是非常糟糕的。事实上，在最新的react 16的官方文档中，ContextAPI被重写了，也就是说这个在react 16之前被称为“最好不要或者谨慎使用的context”也许会在以后是redux的一种替代方案。

### 问题2：什么是redux？
其实说起redux，如果讲一大堆官方文档中的概念，肯定很难理解。简单的说，redux的原理事实上也是使用的context，但是正如上面说的，如果直接使用context，全局变量让程序不可预测，react提高了修改和共享数据的门槛，这就是redux的意义。redux中的store存储着state状态，store中的数据不能被随意修改，所以redux提高了修改的门槛，只有通过使用dispatch方法才能改变里面的state，但是具体怎么改变state，用户是不可能直接和state打交道的，他们只能接触到view层，所以就需要view层的具体的action，根据定义好的修改方法reducer，告诉dispatch怎么修改state。

### 问题3：redux中基本概念都有哪些？
store：存储state的地方

action:是一个有type字段的对象，也可以传入修改state的值，有一个规范传入的是payload

```
    {
      type：‘change_value’,
      payload: 2018
    }
```

reducer：根据action修改state的逻辑规则，下面的规则就是如果传入的action是change_color，那么修改state中的themeColor为action.color;否则返回原有的state

```
      const themeReducer = (state, action) => {
      if (!state) {
          return {
              themeColor: 'red'
          }
      }
      switch (action.type) {
          case 'change_color':
              return {
                  ...state,
                  themeColor: action.themeColor
              }
          default:
              return state;
      }
  }
```

dispatch:唯一可以修改state的方式，这样就保证了state不能随意修改，怎么修改呢？你告诉我action

```
    store.dispatch({ type: 'update_title_text', text: 'uncle pis self-learning redux' });
```

### 问题4： 概念我好像也听懂了，到底怎么玩呢？
我最近看到一个叫react.js小书的react新手教程，其实坐这从头到尾都是从遇到问题解决问题的角度，从手写一个redux，到后面通过官方提供的redux和react-redux逐步替换，重构代码，瞬间让我对redux有了一个很深的理解下面分先给大家：

#### 背景说明：
假设你有两个react的root dom节点一个id为header，另一个是content，顾名思义，一个放入表头，另一个放入内容

```
 <div id="header"></div>
 <div id="content"></div>
```
基于上面的dom，我们想要做一个很简单的界面，一个header显示一个表头，一个content显示一行内容，下面有两个按钮可以控制整个界面的颜色风格

#### 版本1
基于上面的需求，我们很快的写出下面的代码
1.先写一个函数渲染整个App

```
   // 渲染整个App
   function renderApp(newAppState, oldAppState = {}) { // es6对于函数做了默认值处理，防止第一次调用函数没有初始状态
     if (newAppState === oldAppState) {
         return    // 传入newAppState和 oldAppState是处于性能考虑，当数据没有变化不重新调用这个方法
     }
     console.log('render app');
     renderTitle(newAppState.title, oldAppState.title); // 渲染title
     renderContent(newAppState.content, oldAppState.content); // 渲染content
 }
```
2.渲染title的函数

```
function renderTitle(newTitle, oldTitle = {}) {
    if (newTitle === oldTitle) {
        return
    }
    console.log('render title');
    const titleDom = document.getElementById('title'); // 抓取title的dom
    titleDom.innerHTML = newTitle.text; // 如果传入变量text则修改text
    titleDom.style.color = newTitle.color; // 如果传入变量color则修改title的颜色
}

```
3.渲染content的函数

```
 function renderContent(newContent, oldContent = {}) {
     if (newContent === oldContent) {
         return
     }
     console.log('render content');
     const titleDom = document.getElementById('content'); // 抓取content的dom
     titleDom.innerHTML = newContent.text; // 如果传入变量text则修改text
     titleDom.style.color = newContent.color; // 如果传入变量color则修改content的颜色
 }
```


const store = createStore(reducer);
let oldAppState = store.getState();
store.subscribe(() => {
    const newAppState = store.getState();
    renderApp(newAppState, oldAppState);
    oldAppState = newAppState;
});
renderApp(store.getState());
store.dispatch({ type: 'update_title_text', text: 'uncle pis self-learning redux' });
store.dispatch({ type: 'update_title_color', color: 'green' });

```

## redux基本概念和常用api

```
  function CreateStore(themeReducer) {
    let state = null;
    const listeners = [];
    const subscribe = (listener) => listeners.push(listener);
    const getState = () => state;
    const dispatch = (action) => {
        state = themeReducer(state, action);
        listeners.forEach(listener => listener());
    }
    dispatch({});
    return { getState, dispatch, subscribe };
}

```
- 使用createStore生成一个store存储state
- store下用三个api:
  1. getState用于获取当前state的快照，这个也对应于一个唯一的视图
  2. dispatch用于接受一个纯函数的reducer，根据reducer的state和action参数，生成新的state
    2.1 所谓纯函数的reducer,一定是输出结果只和输入参数相关，并且不会影响外部，例如不会修改了外部参数或者发送了ajax获取参数信息
    2.2 reducer接受一个state参数为当前的state信息，action为一个对象，type参数是必有的，payload参数就是根据具体的action的类型传入的需要修改state的参数
  3. subscribe是用于监听dispatch修改了state之后，视图的更新

### 简单的说
- state就是当前状态的快照信息，对应唯一视图
- getState提供了抓去当前快照的方法
- dispatch提供了修改state的方法
- reducer作为纯函数，方便对state的修改进行管理
- action是对state可以修改的场景做规定，因为用户只能操作视图，所以通过dispatch发送action，就会修改state的值

## context
- 根据redux的作者在社交网络的上的评论，在react 16的版本对context做了改进，不再是之前不建议用户使用的context
- 试试上redux的思路也是通过context实现的
- context的使用和redux类似的地方，就是都要提高用户的使用复杂度，避免公共state的修改造成问题

### getChildContext方法设置context
- 有点像cookie和localStorage，需要通过这个方法return数据存储在context中
### childContextTypes必须指定类型
- context在使用前必须定义childContextTypes，然后它的所有自组件都可以共享这个context中存储的信息

### 子组件需要定义contextTypes类型
- 需要在使用的自组建中也定义contextTypes的类型，然后通过this.context使用

## 高阶组件 high－order component
－ 高阶组件其实就是函数
－ 可以把一个组件当作参数传入然后return一个新的组件
－ 一般就是对公共的业务进行封装，比如本例子中自组件都需要从context中读取redux的store
