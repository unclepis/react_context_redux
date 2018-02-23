## redux
  - import { combineReducers } from 'redux' 用于将各个reducer合并
  - import {connect} from 'redux' 一个高阶函数，用于将可复用组件进行加工
  - import { createStore } from 'redux' 生成store，里面提供getState,dispatch和subscribe三个方法
  - import { Provider } from 'react-redux' 用于提供一个父容器将store放入到context中，使得子组件都可以共享context中的store

## store中的state数据张什么样子？
在开始写代码之前，需要思考一下在项目中的state张什么样子，然后根据state的结构，开始分析action和reducer如果对数据流进行更改，例如在本例子中state结构如下:

```
  {
    todos:[ // 待办项列表数组
      {
        id:0,
        text:'第一个待办项'，
        completed:false
      },
      { // 每一个待办项中都有id,名称和是否完成三个字段
        id:1,      
        text:'第二个待办项'，
        completed:true
      }
    ],
    filter:'SHOW_ALL' // 在待办项平级，有一个对待办项列表的过滤条件
  }
```
正是因为数据张这个样子，所以可以看见reducer中，针对不同的action，返回的state数据中，添加待办项和切换待办项状态，都是返回的新的待办项todos数组;而修改过滤条件返回的是状态中的字符串

## actions
  - action是对用户行为的抽象
  - 它是一个普通的js对象
  - 一般为了避免代码重复，会写一个actionCreator的方法生成action
  - 这个js对象中必须有一个type属性定义action的类型

```
  const ChangeColor = (color)=>{
    return {
      type:'Change_color',
      color
    }
  }
```
### step 1. 先分析用户的action行为，写action
  1)新增todo
  2)切换todo的状态
  3)对todoList进行类型过滤
## reducers
  - 是对action的响应
  - 是一个纯方法
  - 传入一个旧的state和action
  - 返回一个新的state

### step 2. 根据action里面对用户行为的抽象，写响应方法reducer(combineReducers)
  1)当新增todo的时候，需要返回新的todoList数组，包含新增的todo对象
  2)当切换todo状态的时候，需要将点击的todo状态切换，todoList的其他todo不变
  3)当对todoList进行类型过滤，需要更新state中的filter类型

## containers
  - 对逻辑和业务进行处理的组件，因为带有特有的业务逻辑，在特定场景下才可以复用
## components
  - 只负责显示的组件，可以复用

