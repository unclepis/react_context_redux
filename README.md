# 使用redux和context上下文管理组件通信

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
